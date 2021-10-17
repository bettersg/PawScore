import { Body, Controller, Get, OnUndefined, Param, Post } from 'routing-controllers';
import { UserAnimalApplicationAttributes, UserAnimalApplicationCreationAttributes, UserAnimalApplicationModel } from "../models/userAnimalApplication";

@Controller('/api/adoption-application')
export class AdoptionApplicationController {
  @Get('/')
  async getAll(): Promise<UserAnimalApplicationAttributes[]> {
    const applications = await UserAnimalApplicationModel.findAll();
    return applications.map(a => a.get({ plain: true }));
  }

  @Get('/:id')
  @OnUndefined(404)
  async getById(@Param("id") id: string): Promise<UserAnimalApplicationAttributes | undefined> {
    const applications = await UserAnimalApplicationModel.findByPk(id);
    return applications?.get({ plain: true });
  }

  @Post('/')
  @OnUndefined(201)
  async create(@Body() body: UserAnimalApplicationCreationAttributes): Promise<void>{
    const data:UserAnimalApplicationCreationAttributes = {
        userProfileId: body.userProfileId,
        animalId: body.animalId,
        applicationType: body.applicationType,
        applicationStatus: body.applicationStatus,
        reasonForAdoption: body.reasonForAdoption,
        rejectionReason: body.rejectionReason,
        adoptionFee: body.adoptionFee
    }
    const u = await UserAnimalApplicationModel.create(data);
    console.debug(`Saved userAnimalApplication ${u.id}`);
  }
}
