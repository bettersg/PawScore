import {
	Body,
	Get,
	JsonController,
	OnUndefined,
	Param,
	Post,
} from "routing-controllers";
import {
	ShelterAttributes,
	ShelterCreationAttributes,
	ShelterModel,
} from "../models/shelter";

@JsonController("/api/shelter")
export class ShelterController {
	@Get("/")
	async getAll(): Promise<ShelterAttributes[]> {
		const shelters = await ShelterModel.findAll();
		return shelters.map((s) => s.get({ plain: true }));
	}

	@Get("/:id")
	@OnUndefined(404)
	async getById(
		@Param("id") id: string,
	): Promise<ShelterAttributes | undefined> {
		const animal = await ShelterModel.findByPk(id);
		return animal?.get({ plain: true });
	}

	@Post("/")
	@OnUndefined(201)
	async create(@Body() shelter: ShelterCreationAttributes): Promise<void> {
		const data: ShelterCreationAttributes = {
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
