import { Attributes } from "../animal";
import { Methods } from "../methods";

export namespace editPetApiDomain {
	export const endpoint = "api/animal";
	export const method = Methods.PUT;
	export type requestQuery = string;
	export type requestBody = Attributes;
}
