import { Employees } from "../entity/Employees";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { IUser } from "../models";

interface IUsersRepository {
  findUsers(): Promise<Employees[]>;
  findOne(employee_id): Promise<Employees>;
  updateUser(employee_id, body): Promise<any>;
}

class UsersRepository {
  repository: Repository<Employees>;

  constructor(repository: Repository<Employees>) {
    this.repository = repository;
  }

  public findUsers(): Promise<Employees[]> {
    try {
      return this.repository.find();
    } catch (error) {
      console.error(error.message);
      return Promise.resolve([]);
    }
  }

  public findOne(employee_id): Promise<Employees> {
    try {
      return this.repository.findOne({ employee_id });
    } catch (error) {
      console.error(error.message);
      return Promise.resolve(null);
    }
  }

  public updateUser(employee_id, body): Promise<any> {
    try {
      this.repository.update({employee_id}, {...body});
      return body;
    } catch (error) {
      console.error(error.message);
      return Promise.resolve(null);
    }
  }
}

export { IUsersRepository, UsersRepository };
