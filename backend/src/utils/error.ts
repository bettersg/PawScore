import express from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ApiErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: HttpError | Error, request: express.Request, response: express.Response): void {
    console.log("[ERROR]", error);
    if (error instanceof HttpError) {
      response.status(error.httpCode).json({ message: error.message });
    } else {
      response.status(500).json({ message: "Internal server error" });
    }
  }
}
