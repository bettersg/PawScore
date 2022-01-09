import { Animal, Shelter, Upload } from "@contract";
import { BaseApi } from "./baseApi";

export class PetApi extends BaseApi {
	public async fetchShelterPets(shelterId: string) {
		const query: Shelter.fetchPetsApiDomain.requestQuery = {
			shelterId,
		};
		const res = await this.fetch<
			Shelter.fetchPetsApiDomain.requestQuery,
			Shelter.fetchPetsApiDomain.response
		>(
			Shelter.fetchPetsApiDomain.method,
			Shelter.fetchPetsApiDomain.endpoint,
			query,
		);

		return res.data;
	}

	public async fetchAllAvailablePets() {
		const response = await this.fetch<
			Animal.fetchPetsApiDomain.requestQuery,
			Animal.fetchPetsApiDomain.response
		>(
			Animal.fetchPetsApiDomain.method,
			Animal.fetchPetsApiDomain.endpoint,
			{
				visible: true,
			},
		);

		return response?.data!;
	}

	public async uploadImage(
		imageData: Upload.uploadImageApiDomain.requestBody,
	) {
		const res = await this.fetch<
			Upload.uploadImageApiDomain.requestBody,
			Upload.uploadImageApiDomain.response
		>(
			Upload.uploadImageApiDomain.method,
			Upload.uploadImageApiDomain.endpoint,
			imageData,
		);

		return res.data;
	}

	public async addNewPet(petData: Shelter.addNewPetApiDomain.requestBody) {
		await this.fetch<Shelter.addNewPetApiDomain.requestBody, null>(
			Shelter.addNewPetApiDomain.method,
			Shelter.addNewPetApiDomain.endpoint,
			petData,
		);
	}
}
