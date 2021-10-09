import errorhandler from "errorhandler";
import express from "express";
import passport from "passport";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { Ability } from "@casl/ability";
import config from "./config/config";
import authStrategy from "./config/passport";
import setupSession from "./config/session";
import { AnimalController } from "./controllers/animal";
import { User as UserType } from "./models/user";
import authRouteSetup from "./routes/auth";
import bookingRouter from "./routes/booking";
import uploadRouter from "./routes/upload";
import userProfileRouter from "./routes/userProfile";
import { ApiErrorMiddleware } from "./utils/error";
import proxy from "express-http-proxy";
import { Actions, setupPermissions, Subjects } from "./authorization";

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

setupPermissions(app);

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
	controllers: [AnimalController],
	development: false,
	defaultErrorHandler: false,
	middlewares: [ApiErrorMiddleware]
});

// Swagger docs route
if (process.env.NODE_ENV === "development") {
	app.use("/docs", express.static(__dirname + "/../../docs/"));
}

app.use("/", proxy(config.frontendUrl));

// start the Express server
app.listen(port, host, () => {
	console.log(`server started at http://${host}:${port}`);
});
