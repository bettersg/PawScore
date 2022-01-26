import { Attributes } from ".";
import { Methods } from "../methods";

export namespace FetchSheltersApiDomain {
	export const endpoint = "api/shelter";
	export const method = Methods.GET;
	export type response = Attributes[];
}

export namespace FetchShelterDataApiDomain {
	export const endpoint = "api/shelter";
	export const method = Methods.GET;
	export type requestPetId = string;
	export type response = Attributes;
}
