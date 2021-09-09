import express from "express";
import errorhandler from "errorhandler";
import passport from "passport";
import authStrategy from "./config/passport";
import setupSession from "./config/session";
import authRouteSetup from "./routes/auth";
import bookingRouter from "./routes/booking"
import uploadRouter from "./routes/upload"
import { isLoggedIn } from "./helpers/auth";
import { User as UserType } from "./models/user";
import config from "./config/config";

// Handle Express req user
declare module 'express' {
  export type User = UserType;
  export interface Request {
    user?: User;
  }
}

const app = express();
const port = config.expressPort;
const host = config.expressHost;

app.use(express.json({limit: '20mb'}));

// error handler
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

setupSession(app);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

authStrategy(passport);

// Set global headers
app.use('/api',function(req,res,next){
    res.header("Content-Type" , "application/json" );
    next(); // http://expressjs.com/guide.html#passing-route control
});

// Routes
authRouteSetup(app, passport);

app.use("/api", isLoggedIn, bookingRouter);
app.use("/api", isLoggedIn, uploadRouter);

// Swagger docs route
if (process.env.NODE_ENV === 'development') {
  app.use('/docs', express.static(__dirname + '/../../docs/'));
}


app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen(port, host, () => {
    console.log( `server started at http://${ host }:${ port }` );
} );
