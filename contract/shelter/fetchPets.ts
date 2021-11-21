import { PetDataItem } from "./types";

export namespace fetchPetsApiDomain {
	export const endpoint = "api/getpets";
	export interface requestBody {
		shelterId: number;
	}
	export type response = PetDataItem[];
}
