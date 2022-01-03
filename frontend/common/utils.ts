import { LoginPayload } from "@contract";

const TOKEN_NAME = "pawscore";

export const AuthToken = {
	store: (payload: LoginPayload) => {
		localStorage.setItem(TOKEN_NAME, JSON.stringify(payload));
	},
	remove: () => {
		localStorage.removeItem(TOKEN_NAME);
	},
	get: () => {
		const token = localStorage.getItem(TOKEN_NAME);
		if (token) {
			return JSON.parse(token);
		}
		return null;
	},
};
