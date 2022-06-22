import { InformationAboutPreviousWorks } from "../entity/InformationAboutPreviousWorks";
import { InformationAboutEmployees } from "../entity/InformationAboutEmployees";

class WorksService {
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  public async findAll(): Promise<InformationAboutPreviousWorks[]> {
    return this.repository.findAll();
  }

  public async find(): Promise<InformationAboutPreviousWorks[]> {
    return this.repository.find();
  }

  public async create(payload): Promise<InformationAboutPreviousWorks> {
    return this.repository.create(payload);
  }
}

export { WorksService };
