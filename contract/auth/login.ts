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

export namespace LoginApiDomain {
	export const loginEndpoint = "/api/login";
	export const registerEndpoint = "/api/register";
	export const method = Methods.POST;
	export type requestBody = LoginFormValues;
	export type response = LoginResponse;
}

export namespace LogoutApiDomain {
	export const endpoint = "/api/logout";
	export const method = Methods.POST;
}
