export * from "./fetchPets";
export * from "./addNewPet";

export interface Attributes {
	id: string;
	name: string;
	address: string;
	country: string;
	contact: string;
	registrationNo: string | null;
}
