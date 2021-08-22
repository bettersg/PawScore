import axios from "axios";

const POKEAPI_URL = "https://pokeapi.co/api/v2";

type Response = {
	data?: any;
	error?: any;
};

export const getPokemon = async (id = undefined) => {
	const response: Response = {};
	try {
		const url = `${POKEAPI_URL}/pokemon${id ? `/${id}` : ""}`;
		const results = await axios.get(url);
		response.data = results.data;
	} catch (e) {
		response.error = e;
	}

	return response;
};
