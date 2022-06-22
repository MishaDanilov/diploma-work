import { Employees } from "../entity/Employees";

class EmployeeService {
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  public async findOne(login): Promise<Employees> {
    return this.repository.findOne(login);
  }

  public async find(): Promise<Employees> {
    return this.repository.find();
  }

  public async findById(id): Promise<Employees> {
    return this.repository.findById(id);
  }
}

export { EmployeeService };