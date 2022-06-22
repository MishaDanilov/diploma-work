import { Employees } from "../entity/Employees";

class LoginService {
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  public async findOneUser(login): Promise<Employees> {
    return this.repository.findOneUser(login);
  }

  public async findOneEmployee(login): Promise<Employees> {
    return this.repository.findOneEmployee(login);
  }
}

export { LoginService };
