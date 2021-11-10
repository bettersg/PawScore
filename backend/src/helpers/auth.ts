import express, { NextFunction } from "express";
import { Action, createParamDecorator } from "routing-controllers";

// check is logged in
export function isLoggedIn(
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function SessionAbility(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options?.required ?? false,
    value: (action: Action) => {
      return (action.request as express.Request).ability;
    }
  });
}
