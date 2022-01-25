import { AsyncLocalStorage, AsyncResource } from "async_hooks";
import crypto from "crypto";
import { Request, RequestHandler } from "express";

type RequestContext = {
	id: string;
	req: Request;
};

// set up a store to persist data through async operations, making them accessible from nested calls
export const requestContextLocalStorage =
	new AsyncLocalStorage<RequestContext>();

export class Logger {
	static log(message: string, ...data: any[]) {
		const context = requestContextLocalStorage.getStore();
		console.dir(
			{
				req: {
					url: context?.req.path,
					id: context?.id,
					timestamp: new Date().toISOString(),
				},
				level: "info",
				message,
				data,
			},
			// customise depth so that nested objects can be printed and limit long string
			{ depth: 5, maxStringLength: 1000 },
		);
	}

	static error(message: string, ...data: any[]) {
		const context = requestContextLocalStorage.getStore();
		console.dir(
			{
				req: {
					url: context?.req.path,
					id: context?.id,
					timestamp: new Date().toISOString(),
				},
				level: "error",
				message,
				data,
			},
			{ depth: 5, maxStringLength: 1000 },
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
