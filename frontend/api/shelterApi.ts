import { Shelter } from "@contract";
import { BaseApi } from "./baseApi";

export class ShelterApi extends BaseApi {
	public async fetchShelterData(
		id: Shelter.FetchShelterDataApiDomain.requestPetId,
	) {
		const response = await this.fetch<
			null,
			Shelter.FetchShelterDataApiDomain.response
		>(
			Shelter.FetchShelterDataApiDomain.method,
			`${Shelter.FetchShelterDataApiDomain.endpoint}/${id}`,
		);
		return response.data;
	}
}
