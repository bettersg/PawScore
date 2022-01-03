import { LoginFormValues } from "types";
import { LoginResponse, Methods } from "@contract";
import { BaseApi } from "./baseApi";

export class AuthApi extends BaseApi {
	public async login(creds: LoginFormValues) {
		const res = await this.request<LoginResponse>(
			Methods.POST,
			"/api/login",
			creds,
		);
		return res!.data!.payload;
	}
	public async register(creds: LoginFormValues) {
		const res = await this.request<LoginResponse>(
			Methods.POST,
			"/api/register",
			creds,
		);
		return res!.data!.payload;
	}
}
