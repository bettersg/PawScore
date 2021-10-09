import { Request, Response, NextFunction, Express } from "express";
import abilities from "./abilities";

export const setupPermissions = (app: Express): void => {
	app.use((req: Request, _: Response, next: NextFunction) => {
		req.ability = abilities.defineRulesFor(req.user);
		next();
	});
};
