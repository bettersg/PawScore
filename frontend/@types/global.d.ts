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
