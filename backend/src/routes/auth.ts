import express from "express";
import passport from "passport";
import { Auth } from "@contract";
import { z } from "zod";
import { User } from "../models/user";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { passwordRegex } from "./helpers/passwordRegex";
import config from "../config/config";

const authRouteSetup = (
	app: express.Application,
	passport: passport.PassportStatic,
): void => {
	app.post(
		"/api/register",
		(req: express.Request, res: express.Response, next: NextFunction) => {
			try {
				const reqSchema = z.object({
					body: z.object({
						username: z.string().max(100).optional(),
						password: z
							.string()
							.min(8)
							.max(72)
							.refine(
								(val) => val.match(passwordRegex),
								"password should have at least 8 characters, and only contain alphanumeric or the following special characters: ~`! @#$%^&*()_-+={[}]|:;\"'<,>.?/",
							),
						email: z.string().email().max(100),
						tempRegistrationKey: z.string().max(100),
					}),
				});
				const { body } = reqSchema.parse(req);
				// Hard coded key to prevent unwanted registrations as we currently do not have proper
				// email verification functionality (i.e. email confirmation link sent to email)
				if (config.tempRegistrationKey !== body.tempRegistrationKey) {
					console.log("Invalid registration key submitted.");
					return res.status(400).send("Invalid registration key");
				}
				req.body.email = body.email.toLowerCase();
				passport.authenticate(
					"local-signup",
					(error: Error, user: User, info) => {
						if (error !== null) {
							console.log(
								"Error in auth.ts > POST /api/register",
							);
							console.log(JSON.stringify(error));
							const result = {
								status: "failed",
								message: "Failed to register",
							};
							return res.status(400).send(JSON.stringify(result));
						} else {
							req.login(user, (loginErr: Error) => {
								if (loginErr) {
									return next(loginErr);
								}
							});
							user.password = "";
							const result: Auth.LoginApiDomain.response = {
								status: "success",
								message: "You have successfully registered",
								payload: user,
							};
							res.end(JSON.stringify(result));
						}
					},
				)(req, res, next);
			} catch (err) {
				if (err instanceof z.ZodError) {
					return res.status(StatusCodes.BAD_REQUEST).send(err.issues);
				}
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
			}
		},
	);

	app.post(
		"/api/login",
		(req: express.Request, res: express.Response, next: NextFunction) => {
			try {
				const reqSchema = z.object({
					body: z.object({
						password: z
							.string()
							.min(8)
							.max(72)
							.refine(
								(val) => val.match(passwordRegex),
								"password should have at least 8 characters, and only contain alphanumeric or the following special characters: ~`! @#$%^&*()_-+={[}]|:;\"'<,>.?/",
							),
						email: z.string().email().max(100),
					}),
				});
				const { body } = reqSchema.parse(req);
				req.body.email = body.email.toLowerCase();
				passport.authenticate(
					"local-login",
					(err: Error, user: User, info) => {
						if (err) {
							console.log("Error in auth.ts > POST /api/login");
							console.log(JSON.stringify(err));
							return next(err);
						}
						if (!user) {
							const result = {
								status: "failure",
								message:
									"You have entered an incorrect username or password",
							};
							return res.status(400).send(JSON.stringify(result));
						}
						req.login(user, (loginErr: Error) => {
							if (loginErr) {
								return next(loginErr);
							}
							user.password = "";
							const result: Auth.LoginApiDomain.response = {
								status: "success",
								message: "You have successfully logged in",
								payload: user,
							};
							return res.end(JSON.stringify(result));
						});
					},
				)(req, res, next);
			} catch (err) {
				if (err instanceof z.ZodError) {
					return res.status(StatusCodes.BAD_REQUEST).send(err.issues);
				}
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
			}
		},
	);

	app.post("/api/logout", (req: express.Request, res: express.Response) => {
		req.logout();
		// LOGOUT TODO: should redirect be handled on FE?
		res.status(StatusCodes.UNAUTHORIZED).json({ redirectPath: "/" });
	});
};

export default authRouteSetup;
