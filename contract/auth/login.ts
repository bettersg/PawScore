import { Methods } from "../methods";

type LoginFormValues = {
	username: string;
	password: string;
	remember?: boolean;
};

export type LoginPayload = {
	id: string;
	username: string;
	email: string;
	roles: string[];
	shelterId: string | null;
};

type LoginResponse = {
	status: string;
	message: string;
	payload: LoginPayload;
};

export namespace loginApiDomain {
	export const loginEndpoint = "/api/login";
	export const registerEndpoint = "/api/register";
	export const method = Methods.POST;
	export type requestBody = LoginFormValues;
	export type response = LoginResponse;
}

export namespace logoutApiDomain {
	export const endpoint = "/api/logout";
	export const method = Methods.POST;
}
