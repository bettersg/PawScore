import express from "express";
import {
  BadRequestError,
  Body,
  Controller,
  ForbiddenError,
  Get,
  NotFoundError,
  OnUndefined,
  Param,
  Post,
  Put,
  Req
} from "routing-controllers";
import { z } from "zod";
import { AppAbility } from "../authorization/abilities";
import { SessionAbility } from "../helpers/auth";
import { AdoptionStatus } from "../models/adoptionStatus";
import { AnimalAttributes, AnimalModel } from "../models/animal";
import { Species } from "../models/species";

@Controller("/api/animal")
export class AnimalController {
  @Get("/")
  async getAll(): Promise<AnimalAttributes[]> {
    const animals = await AnimalModel.findAll({
      include: [AnimalModel.associations.animalImages]
    });
    return animals.map((v) => v.get({ plain: true }));
  }

  @Get("/:id")
  @OnUndefined(404)
  async getById(
    @Param("id") id: string
  ): Promise<AnimalAttributes | undefined> {
    const animal = await AnimalModel.findByPk(id, {
      include: [AnimalModel.associations.animalImages]
    });
    return animal?.get({ plain: true });
  }

  @Post("/")
  @OnUndefined(201)
  async create(
    @Body() body: unknown,
    @SessionAbility() ability: AppAbility,
    @Req() req: express.Request
  ): Promise<void> {
    const input = AnimalRequestBodySchema.parse(body);

    if (!ability.can("create:shelter", "Animal") || !req.user.shelterId) {
      throw new ForbiddenError();
    }

    const attributes = { ...input, shelterId: req.user.shelterId };
    const animal = await AnimalModel.create(attributes);
    console.log(`Created animal with id ${animal.id}`);
  }

  @Put("/:id")
  @OnUndefined(204)
  async update(
    @Param("id") id: string,
    @Body() body: unknown,
    @SessionAbility() ability: AppAbility,
    @Req() req: express.Request
  ): Promise<void> {
    const input = AnimalRequestBodySchema.parse(body);
    const animal = await AnimalModel.findByPk(id);

    if (!animal) {
      throw new NotFoundError();
    }

    if (
      !ability.can("update:shelter", "Animal") ||
      !req.user.shelterId ||
      animal.shelterId !== req.user.shelterId
    ) {
      throw new ForbiddenError();
    }

    await animal.update(input);
    console.log(`Updated animal with id ${animal.id}`);
  }

  // example of how errors will be caught and handled by middleware with the appropriate status code and message
  @Get("/error")
  async get(): Promise<void> {
    throw new BadRequestError("Example error");
  }
}

const AnimalRequestBodySchema = z.object({
  adoptionStatus: z.nativeEnum(AdoptionStatus),
  species: z.nativeEnum(Species),
  name: z.string(),
  description: z.string(),
  healthIssues: z.string().default(""),
  gender: z.enum(["F", "M"]),
  ageMonths: z.number().nullable(),
  sizeCm: z.number().nullable(),
  breed: z.string().nullable(),
  color: z.string(),
  weightKg: z.number().nullable(),
  furLength: z.string().nullable(),
  vaccinated: z.boolean().nullable(),
  dewormed: z.boolean().nullable(),
  sterilized: z.boolean().nullable(),
  adoptionFee: z.number().nullable(),
  intakeDate: z.string()
});
