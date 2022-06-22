import { Employees } from "../entity/Employees";
import { IUser } from "../models";
import { IUsersRepository } from "./users.repository";

interface IUsersService {
  readAll(): Promise<Employees[]>;
  readById(id): Promise<Employees>;
  updateById(id, body): Promise<any>;
}

class UsersService {
  repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async readAll(): Promise<Employees[]> {
    return this.repository.findUsers();
  }
  public async readById(id): Promise<Employees> {
    return this.repository.findOne(id);
  }
  public async updateById(id, body): Promise<any> {
    return this.repository.updateUser(id, body);
  }
}

export { IUsersService, UsersService };
