import Config from "../configs/config";
import { Repository } from "typeorm";
import { Employees } from "../entity/Employees";
import { InformationAboutEmployees } from "../entity/InformationAboutEmployees";

class LoginRepository {
  repositoryUsers: Repository<Employees>;
  repositoryEmployee: Repository<InformationAboutEmployees>;

  constructor(
    repositoryUsers: Repository<Employees>,
    repositoryEmployee: Repository<InformationAboutEmployees>
  ) {
    this.repositoryUsers = repositoryUsers;
    this.repositoryEmployee = repositoryEmployee;
  }

  public async findOneUser(login): Promise<Employees> {
    try {
      const employeeTable = Config.postgreTabels.employees;
      return await this.repositoryUsers
        .createQueryBuilder(employeeTable)
        .select([
          `${employeeTable}.employee_id as employee_id`,
          `${employeeTable}.name as name`,
          `${employeeTable}.surname as surname`,
          `${employeeTable}.login as login`,
          `${employeeTable}.email as email`,
          `${employeeTable}.password as password`,
        ])
        .where(`${employeeTable}.login = :login`, { login })
        .getRawOne();
    } catch (error) {
      console.error(`[LoginRepository.findOneUser]\n${error}`);
      return null;
    }
  }

  public async findOneEmployee(login): Promise<Employees> {
    try {
      const employeeInfoTable = Config.postgreTabels.informationAboutEmployees;
      return await this.repositoryEmployee
        .createQueryBuilder(employeeInfoTable)
        .select([
          `${employeeInfoTable}.employee_id as employee_id`,
          `${employeeInfoTable}.employees as employees`,
          `${employeeInfoTable}.name_of_employee as name_of_employee`,
          `${employeeInfoTable}.post_of_employee as post_of_employee`,
          `${employeeInfoTable}.login as login`,
          `${employeeInfoTable}.surname_of_employee as surname_of_employee`,
          `${employeeInfoTable}.password as password`,

        ])
        .where(`${employeeInfoTable}.login = :login`, { login })
        .getRawOne();
    } catch (error) {
      console.error(`[LoginRepository.findOneEmployee]\n${error}`);
      return null;
    }
  }
}

export { LoginRepository };
