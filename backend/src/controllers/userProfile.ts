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
					.send(`Sequelize: ${err.message}`);
			}
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
		}
	};

const create = async (req: Request, res: Response): Promise<Response> => {
	const reqSchema = z.object({
		body: z.object({
			userId: z.string().uuid(),
			email: z.string().email(),
			phoneNo: z.string(),
			nric: z.string(),
			firstName: z.string(),
			lastName: z.string(),
			dob: z
				.string()
				.refine(
					(val) => val.match(/^\d{4}-\d{2}-\d{2}$/),
					"dob should be in 'YYYY-MM-DD' format."
				)
				.refine(
					(date) => new Date(date) < new Date(),
					"dob should not in the future."
				),
			gender: z.string().refine((val) => ["F", "M"].includes(val)),
			occupation: z.string(),
			address: z.string(),
			postalCode: z.string()
		})
	});
	const { body } = reqSchema.parse(req);

	// CHECK PERMISSIONS
	if (req.ability.can("create", "UserProfile")) {
		// Continue
	} else if (req.ability.can("create:self", "UserProfile")) {
		if (body.userId !== req.user.id) {
			return res.status(StatusCodes.FORBIDDEN).send();
		}
	} else {
		return res.status(StatusCodes.FORBIDDEN).send();
	}

	const userProfile = await UserProfile.create(body);
	return res.send(userProfile);
};

const find = async (req: Request, res: Response): Promise<Response> => {
	// CHECK PERMISSIONS
	if (!req.ability.can("find", "UserProfile")) {
		return res.status(StatusCodes.FORBIDDEN).send();
	} else {
		return res.status(StatusCodes.FORBIDDEN).send();
	}

	const userProfiles = await UserProfile.findAll();
	return res.send(userProfiles);
};

const get = async (req: Request, res: Response): Promise<Response> => {
	const reqSchema = z.object({
		params: z.object({
			userProfileId: z.string().uuid()
		})
	});
	const { params } = reqSchema.parse(req);

	const userProfile = await UserProfile.findOne({
		where: { id: params.userProfileId }
	});
	if (userProfile === null) {
		return res.status(StatusCodes.NOT_FOUND).send();
	}

	// CHECK PERMISSIONS
	if (req.ability.can("read", "UserProfile")) {
		// Continue
	} else if (req.ability.can("read:self", "UserProfile")) {
		if (userProfile.userId !== req.user.id) {
			return res.status(StatusCodes.FORBIDDEN).send();
		}
	} else {
		return res.status(StatusCodes.FORBIDDEN).send();
	}

	return res.send(userProfile);
};

const update = async (req: Request, res: Response): Promise<Response> => {
	const reqSchema = z.object({
		params: z.object({
			userProfileId: z.string().uuid()
		}),
		body: z.object({
			email: z.string().email().optional(),
			phoneNo: z.string().optional(),
			nric: z.string().optional(),
			firstName: z.string().optional(),
			lastName: z.string().optional(),
			dob: z
				.string()
				.refine(
					(val) => val.match(/^\d{4}-\d{2}-\d{2}$/),
					"dob should be in 'YYYY-MM-DD' format."
				)
				.refine(
					(date) => new Date(date) < new Date(),
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

	// CHECK PERMISSIONS
	if (req.ability.can("update", "UserProfile")) {
		// Continue
	} else if (req.ability.can("update:self", "UserProfile")) {
		const userProfile = await UserProfile.findOne({
			where: { id: params.userProfileId }
		});
		if (userProfile?.userId !== req.user.id) {
			return res.status(StatusCodes.FORBIDDEN).send();
		}
	} else {
		return res.status(StatusCodes.FORBIDDEN).send();
	}

	const [count, userProfileArr] = await UserProfile.update(body, {
		where: { id: params.userProfileId },
		returning: true
	});
	if (count === 0) {
		return res.status(StatusCodes.NOT_FOUND).send();
	}
	return res.send(userProfileArr[0]);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
	const reqSchema = z.object({
		params: z.object({
			userProfileId: z.string().uuid()
		})
	});
	const { params } = reqSchema.parse(req);

	// CHECK PERMISSIONS
	if (req.ability.can("delete", "UserProfile")) {
		// Continue
	} else if (req.ability.can("delete:self", "UserProfile")) {
		const userProfile = await UserProfile.findOne({
			where: { id: params.userProfileId }
		});
		if (userProfile?.userId !== req.user.id) {
			return res.status(StatusCodes.FORBIDDEN).send();
		}
	} else {
		return res.status(StatusCodes.FORBIDDEN).send();
	}

	await UserProfile.destroy({
		where: { id: params.userProfileId }
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
