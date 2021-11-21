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

export interface Attributes {
	id: string;
	shelterId: string;
	adoptionStatus: AdoptionStatus;
	species: Species;
	name: string;
	description: string;
	healthIssues: string;
	gender: "F" | "M";
	ageMonths: number | null;
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
	intakeDate: string;
	visible: boolean;
	createdAt: Date;
	updatedAt: Date;
}
