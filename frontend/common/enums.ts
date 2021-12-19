import { Animal } from "@contract";

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
