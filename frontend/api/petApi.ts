import { Shelter, Animal, Upload } from "@contract";
import { NewAnimal } from "common/types";
import { BaseApi } from "./baseApi";

export class PetApi extends BaseApi {
	public async fetchShelterPets(shelterId: string) {
		const query: Shelter.fetchPetsApiDomain.requestQuery = {
			shelterId,
		};
		const res = await this.request<Shelter.fetchPetsApiDomain.response>(
			Shelter.fetchPetsApiDomain.method,
			Shelter.fetchPetsApiDomain.endpoint,
			query,
		);

		return res!.data;
	}

	public async uploadImage(
		imageData: Upload.uploadImageApiDomain.requestBody,
	) {
		const res = await this.request<Upload.uploadImageApiDomain.response>(
			Upload.uploadImageApiDomain.method,
			Upload.uploadImageApiDomain.endpoint,
			imageData,
		);

		return res!.data;
	}

	public async addNewPet(petData: NewAnimal) {
		await this.request(
			Shelter.addNewPetApiDomain.method,
			Shelter.addNewPetApiDomain.endpoint,
			petData,
		);
	}
}
/* Clean up mock data */
// export const mockPetData = (id = "id"): Animal.Attributes => {
// 	return {
// 		id,
// 		shelterId: "test",
// 		adoptionStatus:
// 			Math.random() > 0.5
// 				? Animal.AdoptionStatus.Adopted
// 				: Animal.AdoptionStatus.Healthy,
// 		species:
// 			Math.random() > 0.3
// 				? Animal.Species.Cat
// 				: Math.random() > 0.5
// 				? Animal.Species.Dog
// 				: Animal.Species.Others,
// 		name: `Mock Pet ${id}`,
// 		description: "desccripter",
// 		healthIssues: "none",
// 		gender: Math.random() > 0.5 ? "F" : "M",
// 		dateOfBirth: new Date("2021-11-11"),
// 		sizeCm: 19,
// 		breed: "breeeddeed",
// 		color: "colour issss",
// 		weightKg: 10,
// 		furLength: "long",
// 		vaccinated: true,
// 		dewormed: true,
// 		sterilised: true,
// 		toiletTrained: true,
// 		adoptionFee: 1000,
// 		intakeDate: new Date(),
// 		visible: Math.random() > 0.5 ? true : false,
// 	};
// };
