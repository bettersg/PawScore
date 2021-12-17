import { Request, Response, NextFunction } from "express";

export default function checkPageAuth(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	// TODO: Will need to use user.roles to determine page permissions in future
	const isAuthenticated = req.isAuthenticated();
	const originalUrl = req.originalUrl;

	if (isAuthenticated && originalUrl === "/shelter/login") {
		// TODO: check if user is from a shelter, then bring redirect to shelter's home page
		return res.redirect("/shelter/home");
	}
	if (!isAuthenticated) {
		const PAGES_REQUIRING_SHELTER_LOGIN = [
			"/shelter/home",
			"/shelter/pet/add",
		];
		if (PAGES_REQUIRING_SHELTER_LOGIN.includes(originalUrl)) {
			return res.redirect("/shelter/login");
		}
	}
	// Users will still get any pages when unauthenticated, however API endpoints
	// may not work for them. Black/White listing paths is troublesome and will be verbose
	// as all requests go through express routing
	return next();
}
