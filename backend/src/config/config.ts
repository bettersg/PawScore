import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";

// eslint-disable-next-line
const config: { [index: string]: any } = new Map<string, any>();

dotenv.config({ path: path.resolve(__dirname + "/../../.env") });

config["development"] = {
	databaseConfig: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "postgres",
		define: {
			underscored: true,
			underscoredAll: true
		}
	},
	cookieSecret: process.env.COOKIE_SECRET || "secrete",
	expressHost: process.env.EXPRESS_HOST || "127.0.0.1",
	expressPort: 5000,
	storageBucketName: process.env.STORAGE_BUCKET_NAME,
	googleSvcAcctKey: process.env.GOOGLE_SVC_ACCT_KEY,
	frontendUrl: process.env.FRONTEND_URL || "http://127.0.0.1:3000"
};

config["test"] = {
	databaseConfig: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "postgres",
		define: {
			underscored: true,
			underscoredAll: true
		}
	},
	cookieSecret: process.env.COOKIE_SECRET,
	expressHost: process.env.EXPRESS_HOST || "127.0.0.1",
	expressPort: 5000,
	storageBucketName: process.env.STORAGE_BUCKET_NAME,
	googleSvcAcctKey: process.env.GOOGLE_SVC_ACCT_KEY,
	frontendUrl: process.env.FRONTEND_URL || "http://127.0.0.1:3000"
};

config["production"] = {
	databaseConfig: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "postgres",
		define: {
			underscored: true,
			underscoredAll: true
		}
	},
	cookieSecret: process.env.COOKIE_SECRET,
	expressHost: process.env.EXPRESS_HOST || "0.0.0.0",
	expressPort: 5000,
	storageBucketName: process.env.STORAGE_BUCKET_NAME,
	googleSvcAcctKey: process.env.GOOGLE_SVC_ACCT_KEY,
	frontendUrl: process.env.FRONTEND_URL || "http://127.0.0.1:3000"
};

export default config[env];
