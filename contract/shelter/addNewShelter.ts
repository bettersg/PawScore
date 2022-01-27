import { CreationAttributes } from ".";
import { Methods } from "../methods";

export namespace AddNewShelterApiDomain {
	export const endpoint = "api/shelter";
	export const method = Methods.POST;
	export type requestBody = CreationAttributes;
}
