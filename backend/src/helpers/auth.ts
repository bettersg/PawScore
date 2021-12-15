import express, { NextFunction } from "express";
import {
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from "routing-controllers";

// check is logged in
export function isLoggedIn(
  req: express.Request,
  res: express.Response,
  next: NextFunction,
): void {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

export class IsLoggedInMiddleware implements ExpressMiddlewareInterface {
  use(req: express.Request, res: express.Response, next: NextFunction): void {
    if (req.isAuthenticated()) {
      return next();
    }

    throw new UnauthorizedError("Authorisation required");
  }
}
