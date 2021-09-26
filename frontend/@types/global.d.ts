type Status = "pending" | "rejected";

interface Adopter {
	key: string;
	name: string;
	applicationDate: Date;
	score: number;
	status: Status;
}
