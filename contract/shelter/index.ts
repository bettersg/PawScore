export * from "./addNewPet";
export * from "./addNewShelter";
export * from "./fetchPets";
export * from "./fetchShelter";

interface BaseAttributes {
	name: string;
	address: string;
	country: string;
	contact: string;
	registrationNo: string | null;
}

export interface Attributes extends BaseAttributes {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreationAttributes extends BaseAttributes {}
