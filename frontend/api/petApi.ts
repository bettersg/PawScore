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
const generateMockPetData = (): Shelter.fetchPetsApiDomain.response => {
	const mockData: Animal.Attributes[] = [];
	for (let i = 0; i < 20; i++) {
		mockData.push({
			id: "" + i,
			shelterId: "test",
			adoptionStatus:
				Math.random() > 0.5
					? Animal.AdoptionStatus.Adopted
					: Animal.AdoptionStatus.Healthy,
			species:
				Math.random() > 0.3
					? Animal.Species.Cat
					: Math.random() > 0.5
					? Animal.Species.Dog
					: Animal.Species.Others,
			name: `Mock Pet ${i}`,
			description: "desccripter",
			healthIssues: "none",
			gender: Math.random() > 0.5 ? "F" : "M",
			ageMonths: 10,
			sizeCm: 19,
			breed: "breeeddeed",
			color: "colour issss",
			weightKg: 10,
			furLength: "long",
			vaccinated: true,
			dewormed: true,
			sterilised: true,
			toiletTrained: true,
			adoptionFee: 1000,
			intakeDate: "2021-11-11",
			visible: Math.random() > 0.5 ? true : false,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now()),
		});
	}
	return mockData;
};
const delay = () => {
	return new Promise((resolve) => setTimeout(resolve, 1000));
};
