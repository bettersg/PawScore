import express from "express";
import {
	ExpressErrorMiddlewareInterface,
	HttpError,
	Middleware,
} from "routing-controllers";
import { Logger } from "../helpers/logger";
import { z } from "zod";

@Middleware({ type: "after" })
export class ApiErrorMiddleware implements ExpressErrorMiddlewareInterface {
	error(
		error: HttpError | Error,
		request: express.Request,
		response: express.Response,
	): void {
		Logger.log("[ERROR]", error);
		if (error instanceof HttpError) {
			response.status(error.httpCode).json({ message: error.message });
		} else if (error instanceof z.ZodError) {
			response.status(400).json({ message: error.message });
		} else {
			response.status(500).json({ message: "Internal server error" });
		}
	}
}
