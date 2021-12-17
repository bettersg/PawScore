import axios from "axios";

const createAxiosInstance = () => {
	const config = {
		baseURL: window.location.origin,
		timeout: 30000,
		withCredentials: true,
	};

	return axios.create(config);
};

export default createAxiosInstance;
