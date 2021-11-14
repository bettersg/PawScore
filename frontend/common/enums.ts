// =============================================================================
// Pet Enums/Types
// =============================================================================

export enum Status {
	HEALTHY = "Healthy",
	SICK = "Sick",
	FOSTERED = "Fostered",
	ADOPTED = "Adopted"
}

export enum Species {
	CAT = "Cat",
	DOG = "Dog",
	RABBIT = "Rabbit"
}

export enum Sex {
	MALE = "Male",
	FEMALE = "Female"
}

export enum FurLength {
	LONG = "Long",
	SHORT = "Short",
	CUT = "Cut"
}

export type Sterilised = "yes" | "no" | "others";

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
	PURPLE = "purple"
}

export const SpeciesTags = {
	[Species.DOG]: {
		color: PillColor.GOLD,
		text: Species.DOG.toLowerCase()
	},
	[Species.CAT]: {
		color: PillColor.RED,
		text: Species.CAT.toLowerCase()
	},
	[Species.RABBIT]: {
		color: PillColor.BLUE,
		text: Species.RABBIT.toLowerCase()
	}
};

export const StatusTags = {
	[Status.HEALTHY]: {
		color: PillColor.GOLD,
		text: Status.HEALTHY.toLowerCase()
	},
	[Status.SICK]: {
		color: PillColor.RED,
		text: Status.SICK.toLowerCase()
	},
	[Status.FOSTERED]: {
		color: PillColor.BLUE,
		text: Status.FOSTERED.toLowerCase()
	},
	[Status.ADOPTED]: {
		color: PillColor.PURPLE,
		text: Status.ADOPTED.toLowerCase()
	}
};
