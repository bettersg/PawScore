import express from "express";
import {
	Middleware,
	ExpressErrorMiddlewareInterface,
	HttpError
} from "routing-controllers";
import { z } from "zod";

@Middleware({ type: "after" })
export class ApiErrorMiddleware implements ExpressErrorMiddlewareInterface {
	error(
		error: unknown,
		request: express.Request,
		response: express.Response
	): void {
		console.log("[ERROR]", error);
		if (error instanceof z.ZodError) {
			response
				.status(400)
				.json({ message: "Invalid request parameters" });
		} else if (error instanceof HttpError) {
			response.status(error.httpCode).json({ message: error.message });
		} else {
			response.status(500).json({ message: "Internal server error" });
		}
	}
}
