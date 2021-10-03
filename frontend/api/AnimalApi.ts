import { BASE_URL } from "api";
import axios from "axios";

export default async function fetchPetDetails(id: string) {
	const results = await axios.get<AnimalAttributes>(
		`${BASE_URL}/api/animal/${id}`
	);
	return results.data;
}
