import { Sequelize } from "sequelize";
import allConfig from "./config/config";

// eslint-disable-next-line
const config: any = allConfig.databaseConfig;
export const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config,
);

const testConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		throw error;
	}
};

testConnection();
