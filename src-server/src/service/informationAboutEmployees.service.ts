import { InformationAboutEmployees } from "../entity/InformationAboutEmployees";

class InformationAboutEmployeesService {
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  public async findAll(): Promise<InformationAboutEmployees[]> {
    return this.repository.findAll();
  }
}

export { InformationAboutEmployeesService };
