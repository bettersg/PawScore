export enum Species {
	Cat = "Cat",
	Dog = "Dog",
	Others = "Others",
}

export enum AdoptionStatus {
	Fostered = "Fostered",
	Adopted = "Adopted",
	Sick = "Sick",
	Healthy = "Healthy",
}
export interface Image {
	photoUrl: string;
	thumbnailUrl: string;
}

interface BaseAttributes {
	shelterId: string;
	adoptionStatus: AdoptionStatus;
	species: Species;
	name: string;
	description: string;
	healthIssues: string;
	gender: "F" | "M";
	sizeCm: number | null;
	breed: string | null;
	color: string;
	weightKg: number | null;
	furLength: string | null;
	vaccinated: boolean | null;
	dewormed: boolean | null;
	sterilised: boolean | null;
	toiletTrained: boolean | null;
	adoptionFee: number | null;
	visible: boolean;
	animalImages?: Image[];
}

export interface Attributes extends BaseAttributes {
	id: string;
	dateOfBirth: Date | null;
	intakeDate: Date;
}

export interface NewAnimalAttributes extends BaseAttributes {
	dateOfBirth: string | undefined;
	intakeDate: string;
}
