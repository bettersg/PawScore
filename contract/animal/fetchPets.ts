import { Attributes } from "./enums";
import { Methods } from "../methods";

export namespace fetchPetsApiDomain {
	export const endpoint = "api/animal";
	export const method = Methods.GET;
	export interface requestQuery {
		shelterId?: string;
		visible?: boolean;
	}
	export type response = Attributes[];
}
