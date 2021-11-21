import { AxiosInstance } from "axios";
import { Methods } from "@contract";
import createAxiosInstance from "./createAxiosInstance";

export class BaseApi {
	private readonly client: AxiosInstance;
	constructor() {
		this.client = createAxiosInstance();
	}

	private get(url: string, params?: Record<string, any>) {
		return this.client.get(url, {
			params,
		});
	}

	private post(url: string, body?: Record<string, any>) {
		return this.client.post(url, {
			body,
		});
	}

	protected fetch(
		method: Methods,
		url: string,
		params?: Record<string, any>,
	) {
		switch (method) {
			case Methods.GET:
				return this.get(url, params);
			case Methods.POST:
				return this.post(url, params);
		}
	}
}
