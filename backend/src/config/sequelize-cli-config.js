// this file is used mainly for migration only
const path = require("path");
require('dotenv').config({path: path.resolve(__dirname + "/../../.env")}); // this is important!
console.log(path.resolve(__dirname + "/../../.env"));
console.log(process.env.DB_USER);

module.exports = {
  "development": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": process.env.DB_DATABASE,
      "host": process.env.DB_HOST,
      "dialect": "postgres"
  },
  "test": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": process.env.DB_DATABASE,
      "host": process.env.DB_HOST,
      "dialect": "postgres"
  },
  "production": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": process.env.DB_DATABASE,
      "host": process.env.DB_HOST,
      "dialect": "postgres"
  }
};
