import { Methods } from "../methods";

export namespace downloadApiDomain {
	export const endpoint = "api/upload";
	export const method = Methods.POST;
	export interface response {
		status: string;
		message: string;
		payload: string;
	};
}
