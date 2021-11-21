import { Shelter, Animal } from "@contract";
import { BaseApi } from "./baseApi";

export class PetApi extends BaseApi {
	public async fetchShelterPets(
		shelterId: string,
	): Promise<Shelter.fetchPetsApiDomain.response> {
		// const query: Shelter.fetchPetsApiDomain.requestQuery = {
		// 	shelterId,
		// };
		// const res = await this.fetch(
		// 	Shelter.fetchPetsApiDomain.method,
		// 	Shelter.fetchPetsApiDomain.endpoint,
		// 	query,
		// );
		await delay();
		return generateMockPetData();
	}
}

/* TODO: clean up once fetching actual data */
const generateMockPetData = () => {
	const mockData: Shelter.PetDataItem[] = [];
	for (let i = 0; i < 20; i++) {
		mockData.push({
			key: "" + i,
			name: `Mock Pet ${i}`,
			// image: "",
			visible: Math.random() > 0.5 ? true : false,
			species:
				Math.random() > 0.3
					? Animal.Species.Cat
					: Math.random() > 0.5
					? Animal.Species.Dog
					: Animal.Species.Others,
			status:
				Math.random() > 0.5
					? Animal.AdoptionStatus.Adopted
					: Animal.AdoptionStatus.Healthy,
		});
	}
	return mockData;
};
const delay = () => {
	return new Promise((resolve) => setTimeout(resolve, 1000));
};
