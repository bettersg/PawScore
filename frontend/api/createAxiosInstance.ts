import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (): AxiosInstance => {
	const config = {
		baseURL: window.location.origin,
		timeout: 30000,
		withCredentials: true,
	};

	const instance = axios.create(config);

	instance.interceptors.response.use(
		(response) => response,
		(error) => {
			const STATUS_UNAUTHORIZED = 401;
			if (error?.response?.status === STATUS_UNAUTHORIZED) {
				// Server's 302 redirection only works on documents, and not xhr calls.
				const path =
					error?.response?.data?.redirectPath ?? "/shelter/login";
				console.log(`Unauthenticated API call. Redirecting to ${path}`);
				window.location.assign(path);
			}
			return error;
		},
	);

	return instance;
};

export default createAxiosInstance;
