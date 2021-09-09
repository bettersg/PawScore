// this file is used mainly for migration only
import path from "path"
import dotenv from "dotenv"
dotenv.config({path: path.resolve(__dirname + "/../../.env")});

import fullConfig from "./config"

module.exports = fullConfig.databaseConfig;
