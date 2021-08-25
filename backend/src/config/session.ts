import pg from "pg";
import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";
import config from "./config";
import express from "express";

const pgSession = connectPgSimple(expressSession);

const pgPool = new pg.Pool({
  host: config.databaseConfig.host,
  user: config.databaseConfig.username,
  database: config.databaseConfig.database,
  password: config.databaseConfig.password,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default (app: express.Application): void => {
  app.use(expressSession({
    store: new pgSession({
      pool : pgPool,                // Connection pool
      tableName : 'user_sessions'   // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: config.cookieSecret,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
    saveUninitialized: false,
    resave: false,
  }));
};
