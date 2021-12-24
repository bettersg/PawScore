import { AxiosInstance } from "axios";
import { Methods } from "@contract";
import createAxiosInstance from "./createAxiosInstance";

export class BaseApi {
	private readonly client: AxiosInstance;
	constructor() {
		this.client = createAxiosInstance();
	}

	private get<T>(url: string, params?: Record<string, any>) {
		return this.client.get<T>(url, {
			params,
		});
	}

	private post<T>(url: string, body?: Record<string, any>) {
		return this.client.post<T>(url, {
			body,
		});
	}

	protected request<T>(
		method: Methods,
		url: string,
		params?: Record<string, any>,
	) {
		switch (method) {
			case Methods.GET:
				return this.get<T>(url, params);
			case Methods.POST:
				return this.post<T>(url, params);
		}
	}
}
