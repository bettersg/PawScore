import { Status } from "../animal";
import { Species } from "../animal";

// =============================================================================
// Pet Enums/Types
// =============================================================================

export type PetData = {
	key: string;
	name: string;
	images?: string[];
	visible: boolean;
	species: Species;
	status: Status;
	acquired: Date;
	breed: string;
};

export type PetDataItem = Omit<PetData, "acquired" | "breed">;
