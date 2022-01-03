import express from "express";
import passport from "passport";
import { LoginResponse } from "@contract";
import { User } from "../models/user";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const authRouteSetup = (
	app: express.Application,
	passport: passport.PassportStatic,
): void => {
	app.post(
		"/api/register",
		(req: express.Request, res: express.Response, next: NextFunction) => {
			// eslint-disable-next-line
			passport.authenticate(
				"local-signup",
				(error: Error, user: User, info) => {
					if (error !== null) {
						console.log("Error in auth.ts > POST /api/register");
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
						const result: LoginResponse = {
							status: "success",
							message: "You have successfully registered",
							payload: user,
						};
						res.end(JSON.stringify(result));
					}
				},
			)(req, res, next);
		},
	);

	app.post(
		"/api/login",
		(req: express.Request, res: express.Response, next: NextFunction) => {
			// eslint-disable-next-line
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
						const result: LoginResponse = {
							status: "success",
							message: "You have successfully logged in",
							payload: user,
						};
						return res.end(JSON.stringify(result));
					});
				},
			)(req, res, next);
		},
	);

	app.post("/api/logout", (req: express.Request, res: express.Response) => {
		req.logout();
		// LOGOUT TODO: should redirect be handled on FE?
		res.status(StatusCodes.UNAUTHORIZED).json({ redirectPath: "/" });
	});
};

export default authRouteSetup;
