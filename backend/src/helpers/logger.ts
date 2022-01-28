import { AsyncLocalStorage, AsyncResource } from "async_hooks";
import crypto from "crypto";
import { Request, RequestHandler } from "express";
import config from "../config/config";

declare global {
	class Logger {
		static log(message: string, ...data: any[]): void;
		static error(message: string, ...data: any[]): void;
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
	[key: string]: any;
};

const sensitiveFields = ["password"];

export class Logger {
	static log(message: string, ...data: any[]): void {
		const context = requestContextLocalStorage.getStore();

		const payload: GoogleStructuredJSON = {
			req: {
				url: context?.req.path,
				id: context?.id,
			},
			timestamp: new Date().toISOString(),
			severity: "INFO",
			message,
			data,
		};

		const trace = context?.req.header("X-Cloud-Trace-Context");
		if (trace) {
			payload[
				"logging.googleapis.com/trace"
			] = `projects/pawscore/traces/${trace}`;
		}

		console.log(Logger.stringify(payload));
	}

	static error(message: string, ...data: any[]): void {
		const context = requestContextLocalStorage.getStore();

		const payload: GoogleStructuredJSON = {
			req: {
				url: context?.req.path,
				id: context?.id,
			},
			timestamp: new Date().toISOString(),
			severity: "ERROR",
			message,
			data,
		};

		const trace = context?.req.header("X-Cloud-Trace-Context");
		if (trace) {
			payload[
				"logging.googleapis.com/trace"
			] = `projects/pawscore/traces/${trace}`;
		}

		console.log(Logger.stringify(payload));
	}

	private static stringify(payload: any) {
		const indentation = ["development", "test"].includes(config.nodeEnv)
			? 2
			: undefined;

		// TODO: max depth
		return JSON.stringify(
			payload,
			function (k, v) {
				// blacklist sensitive data
				// TODO: masking function for fields like email?
				if (sensitiveFields.includes(k.toLowerCase())) {
					return "[Redacted]";
				}

				// limit string length

				if (typeof v === "string") {
					return v.length > config.logMaxStringLength
						? v.substring(0, config.logMaxStringLength) + "[...]"
						: v;
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
		Logger.log("Request start", {
			body: req.body,
			query: req.query,
		});
		// successful responses strangely do not emit `finish`, use `close`
		res.on(
			"close",
			// binding required as context was lost
			AsyncResource.bind(() => {
				Logger.log("Request end", { status: res.statusCode });
			}),
		);
		next();
	});
};
