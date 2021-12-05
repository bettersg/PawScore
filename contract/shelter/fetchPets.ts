import { Attributes } from "../animal";
import { Methods } from "../methods";

export namespace fetchPetsApiDomain {
	export const endpoint = "api/animal";
	export const method = Methods.GET;
	export interface requestQuery {
		shelterId: string;
	}
	export type response = Attributes[];
}
