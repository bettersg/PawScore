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

export type PetData = {
	key: number;
	name: string;
	image: string;
	visible: boolean;
	species: Species;
	status: Status;
	action: () => void;
};

// =============================================================================
// Tag/Pill Data
// =============================================================================

export enum PillColor {
	GREEN = "green",
	RED = "red",
	GOLD = "gold",
	BLUE = "blue",
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
