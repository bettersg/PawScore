import { Sequelize } from "sequelize";
import allConfig from "./config/config";

// eslint-disable-next-line 
const config: any = allConfig.databaseConfig;
export const sequelize = new Sequelize(config.database, config.username, config.password, config);