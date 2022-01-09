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

		return res.data;
	}

	public async uploadImage(
		imageData: Upload.uploadImageApiDomain.requestBody,
	) {
		const res = await this.request<Upload.uploadImageApiDomain.response>(
			Upload.uploadImageApiDomain.method,
			Upload.uploadImageApiDomain.endpoint,
			imageData,
		);

		return res.data;
	}

	public async addNewPet(petData: Shelter.addNewPetApiDomain.requestBody) {
		await this.request(
			Shelter.addNewPetApiDomain.method,
			Shelter.addNewPetApiDomain.endpoint,
			petData,
		);
	}
}
