import Config from "../configs/config";
import { Repository } from "typeorm";
import { Employees } from "../entity/Employees";

class EmployeeRepository {
  repository: Repository<Employees>;

  constructor(repository: Repository<Employees>) {
    this.repository = repository;
  }

  public async find(): Promise<Employees[]> {
    try {
      return await this.repository.find({
        select: [
          "employee_id",
          "name",
          "surname",
          "email",
          "login",
          "subscription_status",
        ],
      });
    } catch (error) {
      console.error(`[EmployeeRepository.find]\n${error}`);
      return null;
    }
  }

  public async findById(id): Promise<Employees> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      console.error(`[findById]\n${error}`);
      return null;
    }
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
      console.error(`[EmployeeRepository.findOne]\n${error}`);
      return null;
    }
  }
}

export { EmployeeRepository };
