import { Auth } from "@contract";

const TOKEN_NAME = "pawscore";

export const AuthToken = {
	store: (payload: Auth.LoginPayload) => {
		localStorage.setItem(TOKEN_NAME, JSON.stringify(payload));
	},
	remove: () => {
		localStorage.removeItem(TOKEN_NAME);
	},
	get: (): Auth.LoginPayload | undefined => {
		const token = localStorage.getItem(TOKEN_NAME);
		if (token) {
			return JSON.parse(token) as Auth.LoginPayload;
		}
		return;
	},
};
