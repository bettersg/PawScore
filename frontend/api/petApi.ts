import { Shelter, Species, AdoptionStatus } from "@contract";
import { BaseApi } from "./baseApi";

export class PetApi extends BaseApi {
	public async fetchShelterPets({
		shelterId,
	}: Shelter.fetchPetsApiDomain.requestBody): Promise<Shelter.fetchPetsApiDomain.response> {
		// const ENDPOINT = Shelter.fetchPetsApiDomain.endpoint;
		// this.post(ENDPOINT, { shelterId });
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
					? Species.Cat
					: Math.random() > 0.5
					? Species.Dog
					: Species.Others,
			status:
				Math.random() > 0.5
					? AdoptionStatus.Adopted
					: AdoptionStatus.Healthy,
		});
	}
	return mockData;
};
const delay = () => {
	return new Promise((resolve) => setTimeout(resolve, 1000));
};
