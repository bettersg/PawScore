import { Animal } from "@contract";
// =============================================================================
// Pet Enums/Types
// =============================================================================
// TODO: remove all enums and types as it has been moved to Animal Contract
export enum Status {
	HEALTHY = "Healthy",
	SICK = "Sick",
	FOSTERED = "Fostered",
	ADOPTED = "Adopted",
}

export enum Species {
	CAT = "Cat",
	DOG = "Dog",
	RABBIT = "Rabbit",
}

export enum Sex {
	MALE = "Male",
	FEMALE = "Female",
}

export enum FurLength {
	LONG = "Long",
	SHORT = "Short",
	CUT = "Cut",
}

export enum Sterilised {
	YES = "Yes",
	NO = "No",
	OTHERS = "Others",
}

export type PetData = {
	key: string;
	name: string;
	images: string[];
	visible: boolean;
	sex: Sex;
	species: Species;
	status: Status;
	acquired: Date;
	breed: string;
	furLength: FurLength;
	medicalIssues: string[];
	sterilised: Sterilised;
	dateOfBirth: Date;
	furColor: string[];
	toiletTrained: boolean;
};

// =============================================================================
// Tag/Pill Data
// =============================================================================

export enum PillColor {
	/* for custom colours, add an enum with hex color string value */
	MAGENTA = " magenta",
	RED = "red",
	VOLCANO = "volcano",
	ORANGE = "orange",
	GOLD = "gold",
	LIME = "lime",
	GREEN = "green",
	CYAN = "cyan",
	BLUE = "blue",
	GEEKBLUE = "geekblue",
	PURPLE = "purple",
}

export const SpeciesTags = {
	[Animal.Species.Dog]: {
		color: PillColor.GOLD,
		text: Animal.Species.Dog.toLowerCase(),
	},
	[Animal.Species.Cat]: {
		color: PillColor.RED,
		text: Animal.Species.Cat.toLowerCase(),
	},
	[Animal.Species.Others]: {
		color: PillColor.BLUE,
		text: Animal.Species.Others.toLowerCase(),
	},
};

export const StatusTags = {
	[Animal.AdoptionStatus.Healthy]: {
		color: PillColor.GOLD,
		text: Animal.AdoptionStatus.Healthy.toLowerCase(),
	},
	[Animal.AdoptionStatus.Sick]: {
		color: PillColor.RED,
		text: Animal.AdoptionStatus.Sick.toLowerCase(),
	},
	[Animal.AdoptionStatus.Fostered]: {
		color: PillColor.BLUE,
		text: Animal.AdoptionStatus.Fostered.toLowerCase(),
	},
	[Animal.AdoptionStatus.Adopted]: {
		color: PillColor.PURPLE,
		text: Animal.AdoptionStatus.Adopted.toLowerCase(),
	},
};
