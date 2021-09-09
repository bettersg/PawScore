import { BadRequestError, Controller, Get, OnUndefined, Param } from 'routing-controllers';
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
  async getById(@Param("id") id: string): Promise<AnimalAttributes> {
    const animal = await AnimalModel.findByPk(id, { include: [AnimalModel.associations.animalImages] });
    return animal?.get({ plain: true });
  }

  // example of how errors will be caught and handled by middleware with the appropriate status code and message
  @Get('/error')
  async get(): Promise<void> {
    throw new BadRequestError("Example error")
  }
}
