import Config from "../configs/config";
import { DeleteResult, Repository } from "typeorm";
import { InformationAboutEmployees } from "../entity/InformationAboutEmployees";
import { InformationAboutPreviousWorks } from "../entity/InformationAboutPreviousWorks";
import { TechnicalConclusion } from "../entity/TechnicalConclusion";

class ConclusionRepository {
  repository: Repository<TechnicalConclusion>;

  constructor(repository: Repository<TechnicalConclusion>) {
    this.repository = repository;
  }

  public async findAll(): Promise<TechnicalConclusion[]> {
    try {
      const technicalConclusionTable = Config.postgreTabels.technicalConclusion;
      return await this.repository
        .createQueryBuilder(technicalConclusionTable)
        .select([
          `${technicalConclusionTable}.serial_number_of_TK as serial_number_of_TK`,
          `${technicalConclusionTable}.results_of_preliminary_inspection as results_of_preliminary_inspection`,
          `${technicalConclusionTable}.results_of_general_survey as results_of_general_survey`,
          `${technicalConclusionTable}.results_of_detailed_survey as results_of_detailed_survey`,
          `${technicalConclusionTable}.damaged_elements_of_object as damaged_elements_of_object`,
          `${technicalConclusionTable}.necessary_measures_to_improve_facility as necessary_measures_to_improve_facility`,
          `${technicalConclusionTable}.client_id as client_id`,
        ])
        .getRawMany();
    } catch (error) {
      console.error(`[ConclusionRepository.findAll]\n${error}`);
      return null;
    }
  }

  public async delete(id): Promise<TechnicalConclusion> {
    try {
      return (await this.repository.delete({ serial_number_of_TK: id })).raw;
    } catch (error) {
      console.error(`[ConclusionRepository.findAll]\n${error}`);
      return null;
    }
  }

  public async add(payload): Promise<TechnicalConclusion> {
    try {
      const technicalConclusion = new TechnicalConclusion();
      const { serial_number_of_TK, ...newPayload } = payload;
      const toSave = Object.assign(technicalConclusion, newPayload);
      return this.repository.save(toSave);
    } catch (error) {
      console.error(`[ConclusionRepository.findAll]\n${error}`);
      return null;
    }
  }

  public async update(payload): Promise<TechnicalConclusion> {
    try {
      const { serial_number_of_TK, ...newPayload } = payload;
      console.log(serial_number_of_TK, newPayload);

      await this.repository.update(
        { serial_number_of_TK: serial_number_of_TK },
        newPayload
      );
      return await this.repository.findOne({ serial_number_of_TK });
    } catch (error) {
      console.error(`[ConclusionRepository.findAll]\n${error}`);
      return null;
    }
  }
}

export { ConclusionRepository };
