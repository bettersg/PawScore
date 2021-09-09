import bCrypt from "bcrypt";
import express from "express";
import passportLocal from "passport-local";
import passport from "passport";
import { User, UserCreationAttributes } from "../models/user";

const authStrategy = (passport: passport.PassportStatic): void => {
  const LocalStrategy = passportLocal.Strategy;
  // serialize
  passport.serializeUser((serialUser: User, done) => {
      done(null, serialUser.id);
  });

  // deserialize user
  passport.deserializeUser((id: number, done) => {
    User.findOne({ where: { id } }).then((foundUser: User) => {
      done(null, foundUser.get());
    }).catch((err: Error) => {
      done(err, null);
    });
  });
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req: express.Request, username: string, password: string, done) => {
      const generateHash = (genPass: string) => {
        return bCrypt.hashSync(genPass, bCrypt.genSaltSync(8));
      };

      User.findOne({
        where: {
          username
        }
      }).then((foundUser: User) => {
        if (foundUser)
        {
          return done(Error("Username taken"), null, {
            message: 'That username is already taken'
          });
        } else
        {
          const userPasswordHash = generateHash(password);
          const data:UserCreationAttributes =
            {
              username,
              email: req.body.email,
              password: userPasswordHash,
              role: "ADOPTER",
              shelterId: null,
            };
          User.create(data).then((newUser: User) => {
            if (!newUser) {
              return done(null, null);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));
  passport.use("local-login", new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: false
    },
    (username: string, password: string, done) => {
      User.findOne({
        where: {
          username
        }
      }).then((userFound: User) => {
        if (userFound  === null) {
          return done(null, null, { message: 'Incorrect username.' });
        } else if (!bCrypt.compareSync(password, userFound.password)) {
          return done(null, null, { message: 'Incorrect password.' });
        }
        return done(null, userFound);
      });
    }
  ));


}

export default authStrategy;
