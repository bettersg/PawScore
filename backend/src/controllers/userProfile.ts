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

const create = async (req: Request, res: Response): Promise<Response> => {
	const mySchema = z.object({
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
	const { body } = mySchema.parse(req);
	const userProfile = await UserProfile.create(body);
	return res.send(userProfile);
};

export default { create: controllerWrapper(create) };
