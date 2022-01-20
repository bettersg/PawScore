import { Attributes } from "../animal";
import { NewAnimalAttributes } from "../animal";
import { Methods } from "../methods";

export namespace addNewPetApiDomain {
	export const endpoint = "api/animal";
	export const method = Methods.POST;
	export type requestBody = NewAnimalAttributes;
	export type response = Attributes;
}
