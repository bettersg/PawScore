import { Animal, Shelter } from "@contract";
import express from "express";
import {
	BadRequestError,
	Controller,
	Delete,
	ForbiddenError,
	Get,
	NotFoundError,
	OnUndefined,
	Param,
	Post,
	Put,
	QueryParams,
	Req,
} from "routing-controllers";
import { WhereOptions } from "sequelize/types";
import { z } from "zod";
import { sequelize } from "../database";
import { AnimalModel } from "../models/animal";
import { AnimalImageModel } from "../models/animalImage";
import { zodDateOnlyStringSchema } from "../utils/validation";

@Controller("/api/animal")
export class AnimalController {
	@Get("/")
	async getAll(
		@QueryParams() query: Shelter.fetchPetsApiDomain.requestQuery,
	): Promise<Shelter.fetchPetsApiDomain.response> {
		const input = GetAnimalRequestQuerySchema.parse(query);

		const whereOptions: WhereOptions<Animal.Attributes> = {};

		if (input.shelterId !== undefined) {
			whereOptions.shelterId = input.shelterId;
		}

		if (input.visible !== undefined) {
			whereOptions.visible = input.visible;
		}

		const animals = await AnimalModel.findAll({
			where: whereOptions,
			include: [AnimalModel.associations.animalImages],
		});

		return animals.map((v) => v.get({ plain: true }));
	}

	// example of how errors will be caught and handled by middleware with the appropriate status code and message
	@Get("/error")
	async get(): Promise<void> {
		throw new BadRequestError("Example error");
	}

	@Get("/:id")
	@OnUndefined(404)
	async getById(
		@Param("id") id: string,
	): Promise<Animal.Attributes | undefined> {
		const animal = await AnimalModel.findByPk(id, {
			include: [AnimalModel.associations.animalImages],
		});
		return animal?.get({ plain: true });
	}

	@Post("/")
	@OnUndefined(201)
	async create(@Req() req: express.Request): Promise<void> {
		const input = AnimalRequestBodySchema.parse(req.body);

		if (
			!req.ability.can("create:shelter", "Animal") ||
			input.shelterId !== req.user.shelterId
		) {
			throw new ForbiddenError();
		}

		const animal = await this.createAnimal(input);
		console.log(`Created animal with id ${animal.id}`);
	}

	private async createAnimal(
		input: z.infer<typeof AnimalRequestBodySchema>,
	): Promise<Animal.Attributes> {
		return await sequelize.transaction(async (transaction) => {
			const animal = await AnimalModel.create(input, {
				transaction,
			});

			if (input.animalImages) {
				const animalImages = input.animalImages.map((image) => ({
					...image,
					animalId: animal.id,
				}));
				await AnimalImageModel.bulkCreate(animalImages, {
					transaction,
				});
			}

			return animal;
		});
	}

	@Put("/:id")
	@OnUndefined(204)
	async update(
		@Param("id") id: string,
		@Req() req: express.Request,
	): Promise<void> {
		const input = AnimalRequestBodySchema.parse(req.body);
		const animal = await AnimalModel.findByPk(id);

		if (!animal) {
			throw new NotFoundError();
		}

		if (
			!req.ability.can("update:shelter", "Animal") ||
			!req.user.shelterId ||
			animal.shelterId !== req.user.shelterId
		) {
			throw new ForbiddenError();
		}

		await this.updateAnimal(animal, input);
		console.log(`Updated animal with id ${animal.id}`);
	}

	private async updateAnimal(
		animal: AnimalModel,
		input: z.infer<typeof AnimalRequestBodySchema>,
	): Promise<void> {
		return await sequelize.transaction(async (transaction) => {
			await animal.update(input, {
				transaction,
			});

			await AnimalImageModel.destroy({
				transaction,
				where: { animalId: animal.id },
			});

			if (input.animalImages) {
				const animalImages = input.animalImages.map((image) => ({
					...image,
					animalId: animal.id,
				}));
				await AnimalImageModel.bulkCreate(animalImages, {
					transaction,
				});
			}
		});
	}

	@Delete("/:id")
	@OnUndefined(204)
	async delete(
		@Param("id") id: string,
		@Req() req: express.Request,
	): Promise<void> {
		const animal = await AnimalModel.findByPk(id);

		if (!animal) {
			throw new NotFoundError();
		}

		if (
			!req.ability.can("update:shelter", "Animal") ||
			!req.user.shelterId ||
			animal.shelterId !== req.user.shelterId
		) {
			throw new ForbiddenError();
		}

		// records in animal image table are automatically deleted
		await animal.destroy();
		console.log(`Deleted animal with id ${animal.id}`);
	}
}

const GetAnimalRequestQuerySchema = z.object({
	shelterId: z.string().uuid().optional(),
	visible: z
		.enum(["true", "false"])
		.transform((val) => val === "true")
		.optional(),
});

const AnimalRequestBodySchema = z.object({
	shelterId: z.string().uuid(),
	adoptionStatus: z.nativeEnum(Animal.AdoptionStatus),
	species: z.nativeEnum(Animal.Species),
	name: z.string(),
	description: z.string(),
	healthIssues: z.string().default(""),
	gender: z.enum(["F", "M"]),
	dateOfBirth: zodDateOnlyStringSchema.nullable(),
	sizeCm: z.number().nullable(),
	breed: z.string().nullable(),
	color: z.string(),
	weightKg: z.number().nullable(),
	furLength: z.string().nullable(),
	vaccinated: z.boolean().nullable(),
	dewormed: z.boolean().nullable(),
	sterilised: z.boolean().nullable(),
	toiletTrained: z.boolean().nullable(),
	adoptionFee: z.number().nullable(),
	intakeDate: zodDateOnlyStringSchema,
	visible: z.boolean(),
	animalImages: z
		.object({
			photoUrl: z.string(),
			thumbnailUrl: z.string(),
		})
		.array()
		.max(3)
		.optional(),
});
