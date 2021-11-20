import express, { NextFunction } from "express";

// check is logged in
export function isLoggedIn(
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
