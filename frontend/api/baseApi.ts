import { AxiosInstance } from "axios";
import createAxiosInstance from "./createAxiosInstance";

export class BaseApi {
	private readonly client: AxiosInstance;
	constructor() {
		this.client = createAxiosInstance();
	}

	protected get(url: string, params?: Record<string, any>) {
		return this.client.get(url, {
			params,
		});
	}

	protected post(url: string, body?: Record<string, any>) {
		return this.client.post(url, {
			body,
		});
	}
}
