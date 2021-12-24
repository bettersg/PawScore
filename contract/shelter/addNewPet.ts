import { Attributes } from "../animal";
import { Methods } from "../methods";

export namespace addNewPetApiDomain {
	export const endpoint = "api/animal";
	export const method = Methods.POST;
	export interface requestBody extends Omit<Attributes, "id"> {}
}
