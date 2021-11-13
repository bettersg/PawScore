import { Request, Response, NextFunction } from "express";

export default function checkPageAuth(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const isAuthenticated = req.isAuthenticated();
	const originalUrl = req.originalUrl;

	if (isAuthenticated && originalUrl === "/shelter/login") {
		// TODO: check if user is from a shelter, then bring redirect to shelter's home page
		return res.redirect("/shelter/home");
	}
	// Users will still get any pages when unauthenticated, however API endpoints
	// may not work for them. Black/White listing paths is troublesome and will be verbose
	// as all requests go through express routing
	return next();
}
