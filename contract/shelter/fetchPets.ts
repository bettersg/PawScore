import { Methods } from "../methods";
import { PetDataItem } from "./types";

export namespace fetchPetsApiDomain {
	export const endpoint = "api/animal";
	export const method = Methods.GET;
	export interface requestQuery {
		shelterId: string;
	}
	export type response = PetDataItem[];
}
