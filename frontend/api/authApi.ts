import { loginApiDomain, logoutApiDomain } from "@contract";
import { BaseApi } from "./baseApi";

export class AuthApi extends BaseApi {
	public async login(creds: loginApiDomain.requestBody) {
		const res = await this.fetch<
			loginApiDomain.requestBody,
			loginApiDomain.response
		>(loginApiDomain.method, loginApiDomain.loginEndpoint, creds);
		return res.data.payload;
	}
	public async register(creds: loginApiDomain.requestBody) {
		const res = await this.fetch<
			loginApiDomain.requestBody,
			loginApiDomain.response
		>(loginApiDomain.method, loginApiDomain.registerEndpoint, creds);
		return res.data.payload;
	}

	public async logout() {
		await this.fetch<null, null>(
			logoutApiDomain.method,
			logoutApiDomain.endpoint,
		);
		// LOGOUT TODO: redirect after logout currently handled on BE. should redirect be handled on FE?
		return;
	}
}
