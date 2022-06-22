import {
  TargetOfApplication,
} from "src/entity/targetOfApplication";
import { Repository } from "typeorm";
import {
  ApplicationForWork,
  IApplicationForWork,
} from "../entity/ApplicationForWork";

class ApplicationService {
  private repository;
  private targetRepository: Repository<TargetOfApplication>;

  constructor(repository, targetRepository: Repository<TargetOfApplication>) {
    this.repository = repository;
    this.targetRepository = targetRepository;
  }

  public async create(payload): Promise<ApplicationForWork> {
    return this.repository.create(payload);
  }

  public async findAllById(employeeId): Promise<ApplicationForWork[]> {
    return this.repository.findAllById(employeeId);
  }

  public async findAll(): Promise<IApplicationForWork[]> {
    return this.repository.findAll();
  }

  public async edit(payload): Promise<any> {
    return this.repository.edit(payload);
  }

  public async findOne(id): Promise<ApplicationForWork> {
    return this.repository.findOne(id);
  }

  public async findOneWithForecast(id): Promise<ApplicationForWork> {
    return this.repository.findOneWithForecast(id);
  }

  public async delete(id): Promise<any> {
    return this.repository.delete(id);
  }

  public async findTargets(): Promise<TargetOfApplication[]> {
    return this.targetRepository.find();
  }

  public async updateStatus(payload): Promise<any> {
    return this.repository.updateStatus(payload);
  }
}

export { ApplicationService };
