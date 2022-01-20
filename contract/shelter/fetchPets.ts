import { Attributes } from "../animal";
import { Methods } from "../methods";

export namespace FetchPetsApiDomain {
	export const endpoint = "api/animal";
	export const method = Methods.GET;
	export interface requestQuery {
		shelterId?: string;
		visible?: boolean;
	}
	export type response = Attributes[];
}

export namespace FetchPetDataApiDomain {
	export const endpoint = "api/animal";
	export const method = Methods.GET;
	export type requestPetId = string;
	export type response = Attributes;
}
