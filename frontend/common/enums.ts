import { Species, AdoptionStatus } from "@contract";

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
	[Species.Dog]: {
		color: PillColor.GOLD,
		text: Species.Dog.toLowerCase(),
	},
	[Species.Cat]: {
		color: PillColor.RED,
		text: Species.Cat.toLowerCase(),
	},
	[Species.Others]: {
		color: PillColor.BLUE,
		text: Species.Others.toLowerCase(),
	},
};

export const StatusTags = {
	[AdoptionStatus.Healthy]: {
		color: PillColor.GOLD,
		text: AdoptionStatus.Healthy.toLowerCase(),
	},
	[AdoptionStatus.Sick]: {
		color: PillColor.RED,
		text: AdoptionStatus.Sick.toLowerCase(),
	},
	[AdoptionStatus.Fostered]: {
		color: PillColor.BLUE,
		text: AdoptionStatus.Fostered.toLowerCase(),
	},
	[AdoptionStatus.Adopted]: {
		color: PillColor.PURPLE,
		text: AdoptionStatus.Adopted.toLowerCase(),
	},
};
