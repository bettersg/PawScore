import errorhandler from "errorhandler";
import express from "express";
import proxy from "express-http-proxy";
import passport from "passport";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import config from "./config/config";
import authStrategy from "./config/passport";
import setupSession from "./config/session";
import { AdoptionApplicationController } from "./controllers/adoptionApplication";
import { AnimalController } from "./controllers/animal";
import { ShelterController } from "./controllers/shelter";
import { User as UserType } from "./models/user";
import authRouteSetup from "./routes/auth";
import bookingRouter from "./routes/booking";
import uploadRouter from "./routes/upload";
import userProfileRouter from "./routes/userProfile";
import { ApiErrorMiddleware } from "./utils/error";

// Handle Express req user
declare module "express-serve-static-core" {
	export type User = UserType;
	export interface Request {
		// User should always be available when isLoggedIn is used. User may not be
		// available for non-logged in routes. Making User always present in type
		// definition avoids copious type checking when using req.user.
		user: User;
	}
}

const app = express();
const port = config.expressPort;
const host = config.expressHost;

app.use(express.json({ limit: "20mb" }));

// error handler
if (process.env.NODE_ENV === "development") {
	// only use in development
	app.use(errorhandler());
}

setupSession(app);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

authStrategy(passport);

// Set global headers
app.use(
	"/api",
	function (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		res.header("Content-Type", "application/json");
		next(); // http://expressjs.com/guide.html#passing-route control
	}
);

// Routes
authRouteSetup(app, passport);

app.use("/api", bookingRouter);
app.use("/api", uploadRouter);
app.use("/api", userProfileRouter);

useExpressServer(app, {
	controllers: [AnimalController, ShelterController, AdoptionApplicationController],
	development: false,
	defaultErrorHandler: false,
	middlewares: [ApiErrorMiddleware],
});

// Swagger docs route
if (process.env.NODE_ENV === "development") {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const swaggerUi = require('swagger-ui-express');
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const YAML = require('yamljs');
	const swaggerDocument = YAML.load('../docs/pawscore-swagger.yaml');

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use("/", proxy(config.frontendUrl));

// logging of routes...
app._router.stack.forEach((r: any) => {
	if (r.route && r.route.path) {
		console.debug(`${Object.keys(r.route.methods).join(', ')} -> ${r.route.path}`);
	}
});
bookingRouter.stack.forEach((r: any) => {
	if (r.route && r.route.path) {
		console.debug(`${Object.keys(r.route.methods).join(', ')} -> ${r.route.path}`);
	}
});
uploadRouter.stack.forEach((r: any) => {
	if (r.route && r.route.path) {
		console.debug(`${Object.keys(r.route.methods).join(', ')} -> ${r.route.path}`);
	}
});
// add new routers here
// start the Express server
app.listen(port, host, () => {
	console.log(`server started at http://${host}:${port}`);
});
