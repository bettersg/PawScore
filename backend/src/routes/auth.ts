import express from "express";
import passport from "passport";
import { User } from "../models/user";
import { NextFunction } from "express";

const authRouteSetup = (app: express.Application, passport: passport.PassportStatic): void => {
  app.post('/api/register', (req: express.Request, res: express.Response, next: NextFunction) => {
    // eslint-disable-next-line
    passport.authenticate('local-signup', (error: Error, user: User, info) => {
      if (error !== null) {
        const result = {"status": "failed", "message": "Failed to register"};
        res.end(JSON.stringify(result));
      } else {
        req.login(user, (loginErr: Error) => {
          if (loginErr) {
            return next(loginErr);
          }
        });
        user.password = "";
        const result = {"status": "success", "message": "You have successfully registered", "payload": user};
        res.end(JSON.stringify(result));
      }
    })(req, res, next);
  });

  app.post('/api/login', (req: express.Request, res: express.Response, next: NextFunction) => {
    // eslint-disable-next-line
    passport.authenticate('local-login', (err: Error, user: User, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        const result = {"status": "failure", "message": "You have entered an incorrect username or password"};
        return res.end(JSON.stringify(result));
      }
      req.login(user, (loginErr: Error) => {
        if (loginErr) {
          return next(loginErr);
        }
        user.password = "";
        const result = {"status": "success", "message": "You have successfully logged in", "payload": user};
        return res.end(JSON.stringify(result));
      });
    })(req, res, next);
  });

  app.get('/api/logout', (req: express.Request, res: express.Response) => {
    req.logout();
    res.redirect('/');
  });
};

export default authRouteSetup;
