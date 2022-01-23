import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const schema = z.object({
	NODE_ENV: z.enum([
		"development",
		"gcloud-development",
		"test",
		"production",
	]),
	FRONTEND_URL: z.string(),
	DB_USER: z.string(),
	DB_PASS: z.string(),
	DB_DATABASE: z.string(),
	DB_HOST: z.string(),
	COOKIE_SECRET: z.string(),
	EXPRESS_HOST: z.string(),
	STORAGE_BUCKET_NAME: z.string(),
	GOOGLE_SVC_ACCT_KEY: z.string(),
	NEXT_SERVER_URL: z.string(),
	DB_SOCKET_PATH: z.string(),
	TEMP_REGISTRATION_KEY: z.string(),
});

const validEnv = schema.parse(process.env);

const socket = "/cloudsql/" + validEnv.DB_SOCKET_PATH;

const databaseConfig = {
	username: validEnv.DB_USER,
	password: validEnv.DB_PASS,
	database: validEnv.DB_DATABASE,
	host: validEnv.DB_HOST,
	dialect: "postgres",
	define: {
		underscored: true,
		underscoredAll: true,
	},
};

const otherConfigs = {
	cookieSecret: validEnv.COOKIE_SECRET,
	expressHost: validEnv.EXPRESS_HOST,
	expressPort: 5000,
	storageBucketName: validEnv.STORAGE_BUCKET_NAME,
	googleSvcAcctKey: validEnv.GOOGLE_SVC_ACCT_KEY,
	nextServerUrl: validEnv.NEXT_SERVER_URL,
	frontendUrls: [
		validEnv.FRONTEND_URL,
		"http://127.0.0.1:3000",
		"http://localhost:3000",
	],
	nodeEnv: validEnv.NODE_ENV,
	tempRegistrationKey: validEnv.TEMP_REGISTRATION_KEY,
};

const config = {
	development: {
		databaseConfig,
		...otherConfigs,
	},
	"gcloud-development": {
		databaseConfig: {
			...databaseConfig,
			host: socket,
		},
		...otherConfigs,
	},
	test: {
		databaseConfig,
		...otherConfigs,
	},
	production: {
		databaseConfig: {
			...databaseConfig,
			host: socket,
		},
		...otherConfigs,
		frontendUrls: [validEnv.FRONTEND_URL],
	},
};

export default config[validEnv.NODE_ENV];
