import { AxiosInstance } from "axios";
import { Methods } from "@contract";
import createAxiosInstance from "./createAxiosInstance";

export class BaseApi {
	private readonly client: AxiosInstance;
	constructor() {
		this.client = createAxiosInstance();
	}

	private get<Params, Response>(url: string, params?: Params) {
		return this.client.get<Response>(url, {
			params,
		});
	}

	private post<Body, Response>(url: string, body?: Body) {
		return this.client.post<Response>(url, {
			body,
		});
	}

	protected fetch<Params, Response>(
		method: Methods.GET | Methods.POST,
		url: string,
		params?: Params,
	) {
		switch (method) {
			case Methods.GET:
				return this.get<Params, Response>(url, params);
			case Methods.POST:
				return this.post<Params, Response>(url, params);
		}
	}
}
