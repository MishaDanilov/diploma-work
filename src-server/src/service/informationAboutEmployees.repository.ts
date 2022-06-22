import Config from "../configs/config";
import { Repository } from "typeorm";
import { InformationAboutEmployees } from "../entity/InformationAboutEmployees";

class InformationAboutEmployeesRepository {
  repository: Repository<InformationAboutEmployees>;

  constructor(repository: Repository<InformationAboutEmployees>) {
    this.repository = repository;
  }

  public async findAll(): Promise<InformationAboutEmployees[]> {
    try {
      const informationAboutEmployeesTable = Config.postgreTabels.informationAboutEmployees;
      return await this.repository
        .createQueryBuilder(informationAboutEmployeesTable)
        .select([
          `${informationAboutEmployeesTable}.employee_id as employee_id`,
          `${informationAboutEmployeesTable}.employees as employees`,
          `${informationAboutEmployeesTable}.name_of_employee as name_of_employee`,
          `${informationAboutEmployeesTable}.surname_of_employee as surname_of_employee`,
          `${informationAboutEmployeesTable}.post_of_employee as post_of_employee`,
        ])
        .getRawMany();
    } catch (error) {
      console.error(`[InformationAboutEmployeesRepository.findAll]\n${error}`);
      return null;
    }
  }
}

export { InformationAboutEmployeesRepository };
