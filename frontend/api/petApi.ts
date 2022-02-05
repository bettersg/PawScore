import { Shelter, Upload } from "@contract";
import { BaseApi } from "./baseApi";

export class PetApi extends BaseApi {
	public async fetchShelterPets(shelterId: string) {
		const query: Shelter.FetchPetsApiDomain.requestQuery = {
			shelterId,
		};
		const res = await this.fetch<
			Shelter.FetchPetsApiDomain.requestQuery,
			Shelter.FetchPetsApiDomain.response
		>(
			Shelter.FetchPetsApiDomain.method,
			Shelter.FetchPetsApiDomain.endpoint,
			query,
		);

		return res.data;
	}

	public async fetchAllAvailablePets() {
		const response = await this.fetch<
			Shelter.FetchPetsApiDomain.requestQuery,
			Shelter.FetchPetsApiDomain.response
		>(
			Shelter.FetchPetsApiDomain.method,
			Shelter.FetchPetsApiDomain.endpoint,
			{
				visible: true,
			},
		);

		return response?.data!;
	}

	public async fetchPetData(id: Shelter.FetchPetDataApiDomain.requestPetId) {
		const response = await this.fetch<
			null,
			Shelter.FetchPetDataApiDomain.response
		>(
			Shelter.FetchPetsApiDomain.method,
			`${Shelter.FetchPetsApiDomain.endpoint}/${id}`,
		);
		return response.data;
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

	public async updatePetData(
		id: Shelter.editPetApiDomain.requestQuery,
		petData: Shelter.editPetApiDomain.requestBody,
	) {
		await this.fetch<Shelter.editPetApiDomain.requestBody, null>(
			Shelter.editPetApiDomain.method,
			`${Shelter.editPetApiDomain.endpoint}/${id}`,
			petData,
		);
	}
}
