import { Request, Response, NextFunction, Express } from "express";
export { Actions, Subjects } from "./abilities";
import abilities from "./abilities";

export const setupPermissions = (app: Express): void => {
	app.use((req: Request, _: Response, next: NextFunction) => {
		req.ability = abilities.defineRulesFor(req.user);
		next();
	});
};
