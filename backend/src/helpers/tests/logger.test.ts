import { Request } from "express";
import { BadRequestError } from "routing-controllers";
import config from "../../config/config";
import { Logger, requestContextLocalStorage } from "../logger";

jest.mock("../../config/config", () => ({
	__esModule: true,
	default: {
		nodeEnv: null,
		logMaxStringLength: 100,
		logLevel: "debug",
	},
}));

const consoleSpy = jest.spyOn(global.console, "log");

describe("Logger", () => {
	beforeAll(() => {
		jest.useFakeTimers("modern");
		jest.setSystemTime(new Date("2022-01-31T16:00:00.000Z"));
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	beforeEach(() => {
		config.nodeEnv = "";
		Logger.setLogLevel("debug");
		jest.clearAllMocks();
	});

	test("should default to printing single line JSON", () => {
		Logger.info("message", {
			a: "a",
			b: "b",
		});

		expect(consoleSpy.mock.calls[0][0]).toEqual(
			`{"req":{},"timestamp":"2022-01-31T16:00:00.000Z","severity":"INFO","message":"message","data":[{"a":"a","b":"b"}]}`,
		);
	});

	test("should pretty-print JSON in local environment", () => {
		config.nodeEnv = "development";
		Logger.info("message", {
			a: "a",
			b: "b",
		});

		expect(consoleSpy.mock.calls[0][0]).toEqual(
			`{\n  "req": {},\n  "timestamp": "2022-01-31T16:00:00.000Z",\n  "severity": "INFO",\n  "message": "message",\n  "data": [\n    {\n      "a": "a",\n      "b": "b"\n    }\n  ]\n}`,
		);
	});

	test("should log on equal or higher severity", () => {
		Logger.setLogLevel("error");

		Logger.debug("message");
		Logger.info("message");
		Logger.error("message");
		Logger.fatal("message");

		expect(consoleSpy.mock.calls).toHaveLength(2);
		expect(consoleSpy.mock.calls).toMatchSnapshot();
	});

	test("should extract req information when available", () => {
		const body = {
			a: "a",
			b: "b",
		};

		const context = {
			id: "reqId",
			req: {
				path: "reqPath",
				header: (name: string) => {
					return name === "X-Cloud-Trace-Context"
						? "105445aa7843bc8bf206b12000100000/1;o=1"
						: "reqHeader";
				},
			} as Request,
		};

		requestContextLocalStorage.run(context, () => {
			Logger.info("message", body);
		});

		expect(consoleSpy.mock.calls[0][0]).toMatchSnapshot();
	});

	test("should redact blacklisted fields", () => {
		const body = {
			password: "abcdef",
			notPassword: "123456",
		};

		Logger.info("message", body);

		expect(consoleSpy.mock.calls[0][0]).toMatchSnapshot();
	});

	test("should truncate long strings", () => {
		const body = {
			// 110 chars
			long: new Array(11)
				.fill(0)
				.map(() => "0123456789")
				.join(""),
			nested: {
				long: new Array(11)
					.fill(0)
					.map(() => "0123456789")
					.join(""),
			},
			// 100 chars
			short: new Array(10)
				.fill(0)
				.map(() => "0123456789")
				.join(""),
		};

		Logger.info("message", body);

		expect(consoleSpy.mock.calls[0][0]).toMatchSnapshot();
	});

	test("should print error", () => {
		const error = new Error("error message");

		Logger.info("message", error);

		expect(consoleSpy.mock.calls[0][0]).toEqual(
			`{"req":{},"timestamp":"2022-01-31T16:00:00.000Z","severity":"INFO","message":"message","data":[{"errorName":"Error","errorMessage":"error message"}]}`,
		);
	});

	test("should print routing-controllers error", () => {
		const error = new BadRequestError("error message");

		Logger.info("message", error);

		expect(consoleSpy.mock.calls[0][0]).toEqual(
			`{"req":{},"timestamp":"2022-01-31T16:00:00.000Z","severity":"INFO","message":"message","data":[{"errorName":"BadRequestError","errorMessage":"error message"}]}`,
		);
	});
});
