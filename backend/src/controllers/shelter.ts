import { Shelter } from "@contract";
import {
	Body,
	Get,
	JsonController,
	OnUndefined,
	Param,
	Post,
} from "routing-controllers";
import { ShelterDbCreationAttributes, ShelterModel } from "../models/shelter";

@JsonController("/api/shelter")
export class ShelterController {
	@Get("/")
	async getAll(): Promise<Shelter.FetchSheltersApiDomain.response> {
		const shelters = await ShelterModel.findAll();
		return shelters.map((s) => s.get({ plain: true }));
	}

	@Get("/:id")
	@OnUndefined(404)
	async getById(
		@Param("id") id: string,
	): Promise<Shelter.FetchShelterDataApiDomain.response | undefined> {
		const shelter = await ShelterModel.findByPk(id);
		return shelter?.get({ plain: true });
	}

	@Post("/")
	@OnUndefined(201)
	async create(
		@Body() shelter: Shelter.AddNewShelterApiDomain.requestBody,
	): Promise<void> {
		const data: ShelterDbCreationAttributes = {
			name: shelter.name,
			address: shelter.address,
			country: shelter.country,
			contact: shelter.contact,
			registrationNo: shelter.registrationNo,
		};
		const s = await ShelterModel.create(data);
		console.debug(`Saved shelter ${s.id}`);
	}
}
