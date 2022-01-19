import { Auth } from "@contract";
import { BaseApi } from "./baseApi";

export class AuthApi extends BaseApi {
	public async login(creds: Auth.LoginApiDomain.requestBody) {
		const res = await this.fetch<
			Auth.LoginApiDomain.requestBody,
			Auth.LoginApiDomain.response
		>(Auth.LoginApiDomain.method, Auth.LoginApiDomain.loginEndpoint, creds);
		return res.data.payload;
	}
	public async register(creds: Auth.LoginApiDomain.requestBody) {
		const res = await this.fetch<
			Auth.LoginApiDomain.requestBody,
			Auth.LoginApiDomain.response
		>(
			Auth.LoginApiDomain.method,
			Auth.LoginApiDomain.registerEndpoint,
			creds,
		);
		return res.data.payload;
	}

	public async logout() {
		await this.fetch<null, null>(
			Auth.LogoutApiDomain.method,
			Auth.LogoutApiDomain.endpoint,
		);
		// LOGOUT TODO: redirect after logout currently handled on BE. should redirect be handled on FE?
		return;
	}
}
