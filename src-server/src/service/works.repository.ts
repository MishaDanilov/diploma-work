import Config from "../configs/config";
import { Repository } from "typeorm";
import { InformationAboutEmployees } from "../entity/InformationAboutEmployees";
import { InformationAboutPreviousWorks } from "../entity/InformationAboutPreviousWorks";

class WorksRepository {
  repository: Repository<InformationAboutPreviousWorks>;

  constructor(repository: Repository<InformationAboutPreviousWorks>) {
    this.repository = repository;
  }

  public async findAll(): Promise<InformationAboutPreviousWorks[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      console.error(`[InformationAboutEmployeesRepository.findAll]\n${error}`);
      return null;
    }
  }

  public async find(): Promise<InformationAboutPreviousWorks[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      console.error(`[InformationAboutEmployeesRepository.find]\n${error}`);
      return null;
    }
  }

  public async create(payload): Promise<InformationAboutPreviousWorks> {
    try {
      console.log(payload);
      
      const informationAboutPreviousWorks = new InformationAboutPreviousWorks();
      const newPayload = Object.assign(informationAboutPreviousWorks, payload);
      console.log(newPayload);

      const newInformationAboutPreviousWorks = await this.repository.save(
        newPayload
      );
      return newInformationAboutPreviousWorks;
    } catch (error) {
      console.error(`[InformationAboutEmployeesRepository.create]\n${error}`);
      return null;
    }
  }
}

export { WorksRepository };
