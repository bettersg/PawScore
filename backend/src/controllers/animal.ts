import { BadRequestError, Body, Controller, Get, OnUndefined, Param, Put } from 'routing-controllers';
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

  @Put('/:id')
  async updateAnimal(@Param('id') id: string, @Body() body: AnimalAttributes): Promise<AnimalAttributes> {
    const animal = await this.getById(id);
    if (!animal) {
      throw new BadRequestError("Animal does not exist."); 
    }

    const [, value] = await AnimalModel.update(body, { where: { id },  returning: true });
    return value[0];
  }


  // example of how errors will be caught and handled by middleware with the appropriate status code and message
  @Get('/error')
  async get(): Promise<void> {
    throw new BadRequestError("Example error")
  }
}
