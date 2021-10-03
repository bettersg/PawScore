type Status = "pending" | "rejected";

interface Adopter {
	key: string;
	name: string;
	applicationDate: Date;
	score: number;
	status: Status;
	image: string;
}

type LoginFormValues = {
	username: string;
	password: string;
	remember?: boolean;
};
enum AdoptionStatus {
	Ongoing = "Ongoing",
	Adopted = "Adopted",
	Archived = "Archived"
}

enum Species {
	Cat = "Cat",
	Dog = "Dog",
	Others = "Others"
}

interface AnimalImageAttributes {
	animalId: string;
	photoUrl: string;
	thumbnailUrl: string;
	createdAt: Date;
	updatedAt: Date;
}

// backend/src/models/adoptionStatus.ts
interface AnimalAttributes {
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
	sterilized: boolean | null;
	adoptionFee: number | null;
	intakeDate: string;
	createdAt: Date;
	updatedAt: Date;

	animalImages?: AnimalImageAttributes[];
}
