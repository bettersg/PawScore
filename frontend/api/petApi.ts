import { Shelter, Animal, Upload } from "@contract";
import { NewAnimal } from "common/types";
import { BaseApi } from "./baseApi";

export class PetApi extends BaseApi {
	public async fetchShelterPets(shelterId: string) {
		// TODO: restore actual API request when ready

		// try {
		// 	const query: Shelter.fetchPetsApiDomain.requestQuery = {
		// 		shelterId,
		// 	};
		// 	const res = await this.request<Shelter.fetchPetsApiDomain.response>(
		// 		Shelter.fetchPetsApiDomain.method,
		// 		Shelter.fetchPetsApiDomain.endpoint,
		// 		query,
		// 	);

		// 	return res!.data;
		// } catch (error) {

		// }

		await delay();
		return generateMockPetData();
	}

	public async uploadImage(
		imageData: Upload.uploadImageApiDomain.requestBody,
	) {
		// TODO: restore actual API request when ready

		// try {
		// 	const res = await this.request<Upload.uploadImageApiDomain.response>(
		// 		Upload.uploadImageApiDomain.method,
		// 		Upload.uploadImageApiDomain.endpoint,
		// 		imageData,
		// 	);

		// 	return res!.data;
		// } catch (e) {

		// }

		const mockImgUrl =
			"https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg";

		const mockReturn: Upload.uploadImageApiDomain.response = {
			message: "",
			payload: {
				originalFileName: "mock file name",
				fileName: "mock file name",
				url: mockImgUrl,
				thumbnailUrl: mockImgUrl,
			},
		};
		return mockReturn;
	}

	public async addNewPet(petData: NewAnimal) {
		// TODO: restore actual API request when ready

		try {
			await this.request(
				Shelter.addNewPetApiDomain.method,
				Shelter.addNewPetApiDomain.endpoint,
				petData,
			);
		} catch (e) {}
	}
}

/* TODO: clean up once fetching actual data */
const generateMockPetData = (): Shelter.fetchPetsApiDomain.response => {
	const mockData: Animal.Attributes[] = [];
	for (let i = 0; i < 20; i++) {
		mockData.push(mockPetData(`${i}`));
	}
	return mockData;
};
const delay = () => {
	return new Promise((resolve) => setTimeout(resolve, 1000));
};

export const mockPetData = (id = "id"): Animal.Attributes => {
	return {
		id,
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
		name: `Mock Pet ${id}`,
		description: "desccripter",
		healthIssues: "none",
		gender: Math.random() > 0.5 ? "F" : "M",
		dateOfBirth: new Date("2021-11-11"),
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
		intakeDate: new Date(),
		visible: Math.random() > 0.5 ? true : false,
	};
};
