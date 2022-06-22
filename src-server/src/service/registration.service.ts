import { IUsersRepository } from "./users.repository";
import { Employees } from "../entity/Employees";

class RegistrationService {
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  public async findOne(login): Promise<Employees> {
    return this.repository.findOne(login);
  }

  public async create(payload): Promise<Employees> {
    return this.repository.create(payload);
  }
}

export { RegistrationService };
