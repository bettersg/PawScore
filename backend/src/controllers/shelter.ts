import { Controller, Get, OnUndefined, Param } from 'routing-controllers';
import { ShelterAttributes, ShelterModel } from "../models/shelter";

@Controller('/api/shelter')
export class ShelterController {
  @Get('/')
  async getAll(): Promise<ShelterAttributes[]> {
    const shelters = await ShelterModel.findAll();
    return shelters.map(s => s.get({ plain: true }));
  }

  @Get('/:id')
  @OnUndefined(404)
  async getById(@Param("id") id: string): Promise<ShelterAttributes | undefined> {
    const animal = await ShelterModel.findByPk(id);
    return animal?.get({ plain: true });
  }
}
