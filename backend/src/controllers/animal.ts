import { BadRequestError, Body, Controller, Get, NotFoundError, OnUndefined, Param, Post, Put, Session, UnauthorizedError } from 'routing-controllers';
import { AdoptionStatus } from '../models/adoptionStatus';
import { Species } from '../models/species';
import { z } from 'zod';
import { AppAbility } from '../authorization/abilities';
import { SessionAbility } from '../helpers/auth';
import { AnimalAttributes, AnimalModel } from "../models/animal";

@Controller('/api/animal')
export class AnimalController {
  @Get('/')
  async getAll(): Promise<AnimalAttributes[]> {
    const animals = await AnimalModel.findAll({ include: [AnimalModel.associations.animalImages] });
    return animals.map(v => v.get({ plain: true }));
  }

  @Get('/:id')
  @OnUndefined(404)
  async getById(@Param("id") id: string): Promise<AnimalAttributes | undefined> {
    const animal = await AnimalModel.findByPk(id, { include: [AnimalModel.associations.animalImages] });
    return animal?.get({ plain: true });
  }

  @Post('/')
  @OnUndefined(201)
  async create(@Body() body: unknown, @SessionAbility() ability: AppAbility): Promise<void> {
    const input = AnimalRequestBodySchema.parse(body);

    if (!ability.can("create:shelter", "Animal")) {
      throw new UnauthorizedError();
    }

    // TODO: get shelterId from session
    const attributes = { ...input, shelterId: "e9c4fb2c-e5bb-4d14-be23-6c264130be88" }
    const animal = await AnimalModel.create(attributes);
    console.log(`Created animal with id ${animal.id}`)
  }

  @Put('/:id')
  @OnUndefined(204)
  async update(@Param("id") id: string, @Body() body: unknown, @SessionAbility() ability: AppAbility): Promise<void> {
    const input = AnimalRequestBodySchema.parse(body);
    const animal = await AnimalModel.findByPk(id);

    if (!animal) {
      throw new NotFoundError();
    }

    // TODO: get shelterId from session
    const shelterId = "e9c4fb2c-e5bb-4d14-be23-6c264130be88";
    if (!ability.can("update:shelter", "Animal") || animal.shelterId !== shelterId) {
      throw new UnauthorizedError();
    }

    await animal.update(input);
    console.log(`Updated animal with id ${animal.id}`)
  }

  // example of how errors will be caught and handled by middleware with the appropriate status code and message
  @Get('/error')
  async get(): Promise<void> {
    throw new BadRequestError("Example error")
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
