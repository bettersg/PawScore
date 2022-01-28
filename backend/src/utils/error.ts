import express from "express";
import {
	ExpressErrorMiddlewareInterface,
	HttpError,
	Middleware,
} from "routing-controllers";
import { z } from "zod";

@Middleware({ type: "after" })
export class ApiErrorMiddleware implements ExpressErrorMiddlewareInterface {
	error(
		error: HttpError | Error,
		request: express.Request,
		response: express.Response,
	): void {
		if (error instanceof HttpError) {
			Logger.error("Api error", error.message);
			response.status(error.httpCode).json({ message: error.message });
		} else if (error instanceof z.ZodError) {
			Logger.error("Validation error", error.flatten());
			response.status(400).json({ message: error.message });
		} else {
			Logger.error("Unhandled error", error.message);
			response.status(500).json({ message: "Internal server error" });
		}
	}
}
