export type LoginPayload = {
	id: string;
	username: string;
	email: string;
	roles: string[];
	shelterId: string | null;
};

export type LoginResponse = {
	status: string;
	message: string;
	payload: LoginPayload;
};
