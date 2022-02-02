import { Sequelize } from "sequelize";
import allConfig from "./config/config";

// eslint-disable-next-line
const config: any = allConfig.databaseConfig;
config.logging = (sql: string) => Logger.debug(sql);
export const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config,
);

const testConnection = async () => {
	try {
		await sequelize.authenticate();
		Logger.info("Connection has been established successfully.");
	} catch (error) {
		Logger.fatal("Unable to connect to the database:", error);
		throw error;
	}
};

testConnection();
