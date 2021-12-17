export type LoginResponse = {
	status: string;
	message: string;
	payload: {
		id: string;
		username: string;
		email: string;
		roles: string[];
		shelterId: string | null;
	};
};
