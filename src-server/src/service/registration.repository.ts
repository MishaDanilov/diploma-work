import Config from "../configs/config";
import { Repository } from "typeorm";
import { Employees } from "../entity/Employees";

class RegistrationRepository {
  repository: Repository<Employees>;

  constructor(repository: Repository<Employees>) {
    this.repository = repository;
  }

  public async findOne(login): Promise<Employees> {
    try {
      const employeeTable = Config.postgreTabels.employees;
      return await this.repository
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
      console.error(`[RegistrationRepository.findOne]\n${error}`);
      return null;
    }
  }

  public async create(payload): Promise<Employees> {
    try {
      const employees = new Employees();
      const newPayload = Object.assign(employees, payload);
      return this.repository.save(newPayload);
    } catch (error) {
      console.error(`[RegistrationRepository.findOne]\n${error}`);
      return null;
    }
  }
}

export { RegistrationRepository };
