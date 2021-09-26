import { Request, Response } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { UserProfile } from "../models/userProfile";
import { BaseError } from "sequelize";

type ControllerItem = (req: Request, res: Response) => Promise<Response>;

const controllerWrapper =
	(controllerItem: ControllerItem) => async (req: Request, res: Response) => {
		try {
			return await controllerItem(req, res);
		} catch (err) {
			if (err instanceof z.ZodError) {
				return res.status(StatusCodes.BAD_REQUEST).send(err.issues);
			}
			if (err instanceof BaseError) {
				return res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.send(err.message);
			}
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
		}
	};

const find = async (req: Request, res: Response): Promise<Response> => {
	const userProfiles = await UserProfile.findAll();
	return res.send(userProfiles);
};

const create = async (req: Request, res: Response): Promise<Response> => {
	const reqSchema = z.object({
		body: z.object({
			authUserId: z.string().uuid(),
			email: z.string().email(),
			phoneNo: z.string(),
			nric: z.string(),
			firstName: z.string(),
			lastName: z.string(),
			dob: z
				.string()
				.refine((val) => val, "dob should be in UTC format.") // TODO: Validate for UTC Date format
				.transform((val) => new Date(val))
				.refine(
					(date) => date < new Date(),
					"dob should not in the future."
				),
			gender: z.string().refine((val) => ["F", "M"].includes(val)),
			occupation: z.string(),
			address: z.string(),
			postalCode: z.string()
		})
	});
	const { body } = reqSchema.parse(req);
	const userProfile = await UserProfile.create(body);
	return res.send(userProfile);
};

const get = async (req: Request, res: Response): Promise<Response> => {
	const reqSchema = z.object({
		params: z.object({
			authUserId: z.string().uuid()
		})
	});
	const { params } = reqSchema.parse(req);
	const userProfile = await UserProfile.findOne({
		where: { id: params.authUserId }
	});
	if (userProfile === null) {
		return res.status(StatusCodes.NOT_FOUND).send();
	}
	return res.send(userProfile);
};

const update = async (req: Request, res: Response): Promise<Response> => {
	const reqSchema = z.object({
		params: z.object({
			authUserId: z.string().uuid()
		}),
		body: z.object({
			email: z.string().email().optional(),
			phoneNo: z.string().optional(),
			nric: z.string().optional(),
			firstName: z.string().optional(),
			lastName: z.string().optional(),
			dob: z
				.string()
				.refine((val) => val, "dob should be in UTC format.") // TODO: Validate for UTC Date format
				.transform((val) => new Date(val))
				.refine(
					(date) => date < new Date(),
					"dob should not in the future."
				)
				.optional(),
			gender: z
				.string()
				.refine((val) => ["F", "M"].includes(val))
				.optional(),
			occupation: z.string().optional(),
			address: z.string().optional(),
			postalCode: z.string().optional()
		})
	});

	const { params, body } = reqSchema.parse(req);
	const userProfile = await UserProfile.update(body, {
		where: { id: params.authUserId }
	});
	if (userProfile === null) {
		return res.status(StatusCodes.NOT_FOUND).send();
	}
	return res.send(userProfile);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
	const reqSchema = z.object({
		params: z.object({
			authUserId: z.string().uuid()
		})
	});
	const { params } = reqSchema.parse(req);
	await UserProfile.destroy({
		where: { id: params.authUserId }
	});
	return res.send();
};

export default {
	find: controllerWrapper(find),
	create: controllerWrapper(create),
	get: controllerWrapper(get),
	update: controllerWrapper(update),
	destroy: controllerWrapper(destroy)
};
