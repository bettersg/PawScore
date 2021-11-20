import bCrypt from "bcrypt";
import express from "express";
import passportLocal from "passport-local";
import passport from "passport";
import { User, UserCreationAttributes } from "../models/user";

const authStrategy = (passport: passport.PassportStatic): void => {
	const LocalStrategy = passportLocal.Strategy;
	// serialize
	passport.serializeUser(async (_user, done) => {
		const user = _user as unknown as User;
		done(null, user?.id);
	});

	// deserialize user
	passport.deserializeUser(async (id: string, done) => {
		try {
			const user = await User.findOne({ where: { id } });
			if (user === null) {
				throw new Error(`Error deserializing user with id ${id}`);
			}
			done(null, user.get());
		} catch (err) {
			done(err, null);
		}
	});

	passport.use(
		"local-signup",
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			async (
				req: express.Request,
				username: string,
				password: string,
				done
			) => {
				try {
					const generateHash = (genPass: string) => {
						return bCrypt.hashSync(genPass, bCrypt.genSaltSync(8));
					};

					const existingUser = await User.findOne({
						where: {
							email: req.body.email
						}
					});
					if (existingUser) {
						return done(Error("Username taken"), null, {
							message: "That email address is already taken"
						});
					} else {
						const userPasswordHash = generateHash(password);
						const data: UserCreationAttributes = {
							username: req.body.username || req.body.email,
							email: req.body.email,
							password: userPasswordHash,
							roles: ["ADOPTER"],
							shelterId: null
						};
						const newUser = await User.create(data);
						if (!newUser) {
							return done(null, null);
						}
						if (newUser) {
							return done(null, newUser);
						}
					}
				} catch (err) {
					done(err, null);
				}
			}
		)
	);
	passport.use(
		"local-login",
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true
			},
			async (
				req: express.Request,
				username: string,
				password: string,
				done
			) => {
				try {
					const userFound = await User.findOne({
						where: {
							email: req.body.email
						}
					});
					if (userFound === null) {
						return done(null, null, {
							message: "Incorrect email address."
						});
					} else if (
						!bCrypt.compareSync(password, userFound.password)
					) {
						return done(null, null, {
							message: "Incorrect password."
						});
					}
					return done(null, userFound);
				} catch (err) {
					done(err, null);
				}
			}
		)
	);
};

export default authStrategy;
