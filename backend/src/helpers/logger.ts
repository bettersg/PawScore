/* eslint-disable  @typescript-eslint/no-explicit-any */

import { AsyncLocalStorage, AsyncResource } from "async_hooks";
import crypto from "crypto";
import { Request, RequestHandler } from "express";
import config from "../config/config";

declare global {
	class Logger {
		static debug(message: string, ...data: any[]): void;
		static info(message: string, ...data: any[]): void;
		static error(message: string, ...data: any[]): void;
		static fatal(message: string, ...data: any[]): void;
	}
}

type RequestContext = {
	id: string;
	req: Request;
};

// set up a store to persist data through async operations, making them accessible from nested calls
export const requestContextLocalStorage =
	new AsyncLocalStorage<RequestContext>();

// fields picked up by Cloud Logging
type GoogleStructuredJSON = {
	severity: string;
	message: string;
	timestamp: string;
	"logging.googleapis.com/trace"?: string;
};

type DefaultLoggingPayload = Omit<GoogleStructuredJSON, "message"> &
	Record<string, any>;

type LoggingPayload = GoogleStructuredJSON & Record<string, any>;

const SENSITIVE_FIELDS = ["password"];

enum LogLevel {
	Debug,
	Info,
	Error,
	Fatal,
}

const LogToLogLevelMap: Record<string, LogLevel> = {
	debug: LogLevel.Debug,
	info: LogLevel.Info,
	error: LogLevel.Error,
	fatal: LogLevel.Fatal,
};

export class Logger {
	private static logLevel =
		LogToLogLevelMap[config.logLevel ?? "info"] ?? LogLevel.Info;

	static setLogLevel(logLevel: string): void {
		if (LogToLogLevelMap[logLevel] === undefined) {
			throw new Error("Invalid log level");
		}
		Logger.logLevel = LogToLogLevelMap[logLevel];
	}

	static debug(message: string, ...data: any[]): void {
		if (Logger.logLevel <= LogLevel.Debug) {
			Logger.log("DEBUG", message, data);
		}
	}

	static info(message: string, ...data: any[]): void {
		if (Logger.logLevel <= LogLevel.Info) {
			Logger.log("INFO", message, data);
		}
	}

	static error(message: string, ...data: any[]): void {
		if (Logger.logLevel <= LogLevel.Error) {
			Logger.log("ERROR", message, data);
		}
	}

	static fatal(message: string, ...data: any[]): void {
		if (Logger.logLevel <= LogLevel.Fatal) {
			Logger.log("CRITICAL", message, data);
		}
	}

	private static log(severity: string, message: string, data: any[]): void {
		const payload: LoggingPayload = {
			...Logger.constructDefaultPayload(severity),
			message,
			data,
		};

		console.log(Logger.stringify(payload));
	}

	private static constructDefaultPayload(severity: string) {
		const context = requestContextLocalStorage.getStore();

		const payload: DefaultLoggingPayload = {
			req: {
				url: context?.req.path,
				id: context?.id,
				user: context?.req?.user?.id,
			},
			timestamp: new Date().toISOString(),
			severity: severity,
		};

		const traceHeader = context?.req.header("X-Cloud-Trace-Context");
		if (traceHeader) {
			const [traceId] = traceHeader.split("/");
			payload[
				"logging.googleapis.com/trace"
			] = `projects/pawscore/traces/${traceId}`;
		}

		return payload;
	}

	private static stringify(payload: any) {
		const indentation = ["development"].includes(config.nodeEnv)
			? 2
			: undefined;

		// TODO: max depth
		return JSON.stringify(
			payload,
			function (k, v) {
				// blacklist sensitive data
				// TODO: masking function for fields like email?
				if (SENSITIVE_FIELDS.includes(k.toLowerCase())) {
					return "[Redacted]";
				}

				// limit string length
				if (typeof v === "string") {
					return v.length > config.logMaxStringLength
						? v.substring(0, config.logMaxStringLength) + "[...]"
						: v;
				}

				if (v instanceof Error) {
					return {
						errorName: v.name,
						errorMessage: v.message,
						errorCode: (v as any).code,
					};
				}

				return v;
			},
			indentation,
		);
	}
}

export const LoggerContextMiddleware: RequestHandler = (req, res, next) => {
	const context = {
		id: crypto.randomUUID(),
		req,
	};

	requestContextLocalStorage.run(context, () => {
		if (!req.path.startsWith("/_next")) {
			Logger.info("Request start", {
				body: req.body,
				query: req.query,
			});
			// successful responses strangely do not emit `finish`, use `close`
			res.on(
				"close",
				// binding required as context was lost
				AsyncResource.bind(() => {
					Logger.info("Request end", { status: res.statusCode });
				}),
			);
		}
		next();
	});
};
