import { InformationAboutPreviousWorks } from "../entity/InformationAboutPreviousWorks";
import { InformationAboutEmployees } from "../entity/InformationAboutEmployees";
import { TechnicalConclusion } from "../entity/TechnicalConclusion";

class ConclusionService {
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  public async findAll(): Promise<TechnicalConclusion[]> {
    return this.repository.findAll();
  }

  public async add(payload): Promise<TechnicalConclusion> {
    return this.repository.add(payload);
  }

  public async update(payload): Promise<TechnicalConclusion> {
    return this.repository.update(payload);
  }

  public async delete(id): Promise<TechnicalConclusion> {
    return this.repository.delete(id);
  }
}

export { ConclusionService };
