import { LoginFormValues } from "types";
import { LoginResponse, Methods } from "@contract";
import { BaseApi } from "./baseApi";

export class AuthApi extends BaseApi {
	public async login(creds: LoginFormValues) {
		const res = await this.fetch<LoginFormValues, LoginResponse>(
			Methods.POST,
			"/api/login",
			creds,
		);
		return res!.data!.payload;
	}
	public async register(creds: LoginFormValues) {
		const res = await this.fetch<LoginFormValues, LoginResponse>(
			Methods.POST,
			"/api/register",
			creds,
		);
		return res!.data!.payload;
	}

	public async logout() {
		const res = await this.fetch(Methods.POST, "/api/logout");
		// LOGOUT TODO: redirect after logout currently handled on BE. should redirect be handled on FE?
		return;
	}
}
