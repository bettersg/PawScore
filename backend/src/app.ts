import { Ability } from "@casl/ability";
import cors from "cors";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import errorhandler from "errorhandler";
import express from "express";
import proxy from "express-http-proxy";
import passport from "passport";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { Actions, setupPermissions, Subjects } from "./authorization";
import config from "./config/config";
import authStrategy from "./config/passport";
import setupSession from "./config/session";
import { AnimalController } from "./controllers/animal";
import { HealthCheckController } from "./controllers/healthcheck";
import { ShelterController } from "./controllers/shelter";
import { UploadController } from "./controllers/upload";
import checkPageAuth from "./helpers/checkPageAuth";
import { User as UserType } from "./models/user";
import authRouteSetup from "./routes/auth";
import bookingRouter from "./routes/booking";
import healthcheckRouter from "./routes/healthcheck";
import userProfileRouter from "./routes/userProfile";
import { ApiErrorMiddleware } from "./utils/error";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

// Handle Express req user
declare module "express-serve-static-core" {
	export type User = UserType;
	export interface Request {
		// User and ability should always be available when isLoggedIn is used. They
		// may not be available for non-logged in routes. Making them always present
		// in type definition avoids copious type checking when using req.xxxx.
		user: User;
		ability: Ability<[Actions, Subjects]>;
	}
}

const app = express();
const port = config.expressPort;
const host = config.expressHost;

app.use(cors({ credentials: true, origin: config.frontendUrls }));

app.use(express.json({ limit: "20mb" }));

// error handler
if (config.nodeEnv === "development") {
	// only use in development
	app.use(errorhandler());
}

setupSession(app);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

authStrategy(passport);

setupPermissions(app);

// Set global headers
app.use(
	"/api",
	function (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		res.header("Content-Type", "application/json");
		next(); // http://expressjs.com/guide.html#passing-route control
	},
);

// Routes
authRouteSetup(app, passport);

app.use("/api", healthcheckRouter);
app.use("/api", bookingRouter);
app.use("/api", userProfileRouter);

useExpressServer(app, {
	controllers: [AnimalController, ShelterController, HealthCheckController, UploadController],
	development: false,
	defaultErrorHandler: false,
	middlewares: [ApiErrorMiddleware],
});

// Swagger docs route
if (config.nodeEnv === "development") {
	app.use("/docs", express.static(__dirname + "/../../docs/"));
}

app.use("/", checkPageAuth, proxy(config.nextServerUrl));

// logging of routes...
app._router.stack.forEach((r: any) => {
	if (r.route && r.route.path) {
		console.debug(
			`${Object.keys(r.route.methods).join(", ")} -> ${r.route.path}`,
		);
	}
});
bookingRouter.stack.forEach((r: any) => {
	if (r.route && r.route.path) {
		console.debug(
			`${Object.keys(r.route.methods).join(", ")} -> ${r.route.path}`,
		);
	}
});
// add new routers here
// start the Express server
app.listen(port, host, () => {
	console.log(`server started at http://${host}:${port}`);
});
