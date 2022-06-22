import Config from "../configs/config";
import { Repository } from "typeorm";
import {
  ApplicationForWork,
  IApplicationForWork,
} from "../entity/ApplicationForWork";

class ApplicationRepository {
  repository: Repository<ApplicationForWork>;

  constructor(repository: Repository<ApplicationForWork>) {
    this.repository = repository;
  }

  public async create(payload): Promise<ApplicationForWork> {
    try {
      const applicationForWork = new ApplicationForWork();
      const newPayload = Object.assign(applicationForWork, payload);
      const newApplication = await this.repository.save(newPayload);
      return newApplication;
    } catch (error) {
      console.error(`[ApplicationRepository.create]\n${error}`);
      return null;
    }
  }

  public async findAllById(employeeId): Promise<ApplicationForWork[]> {
    try {
      return this.repository.find({ where: { client_id: employeeId } });
    } catch (error) {
      console.error(`[ApplicationRepository.findAll]\n${error}`);
      return null;
    }
  }

  public async findAll(): Promise<IApplicationForWork[]> {
    try {
      const applications = await this.repository.find({
        select: [
          "application_number",
          "purpose_of_survey",
          "reason_for_examination",
          "name_of_object",
          "area_object",
          "location_of_object",
          "client_contact_details",
          "date_of_creation",
          "status",
        ],
        relations: ["target"],
        order: { date_of_creation: "ASC" },
      });
      console.log(applications);

      return applications;
    } catch (error) {
      console.error(`[ApplicationRepository.findAll]\n${error}`);
      return null;
    }
  }

  public async findOne(id): Promise<ApplicationForWork> {
    try {
      return this.repository.findOne(id);
    } catch (error) {
      console.error(`[ApplicationRepository.findOne]\n${error}`);
      return null;
    }
  }

  public async findOneWithForecast(id): Promise<ApplicationForWork> {
    try {
      return this.repository.findOne({
        where: {
          application_number: id,
        },
        relations: ["target", "target.forecast", "target.forecast.materials"],
      });
    } catch (error) {
      console.error(`[ApplicationRepository.findOneWithForecast]\n${error}`);
      return null;
    }
  }

  public async delete(id): Promise<any> {
    try {
      return this.repository.delete(id);
    } catch (error) {
      console.error(`[ApplicationRepository.delete]\n${error}`);
      return null;
    }
  }

  public async edit(payload): Promise<any> {
    try {
      const {
        application_number,
        purpose_of_survey,
        reason_for_examination,
        name_of_object,
        location_of_object,
        client_contact_details,
        status,
      } = payload;
      return this.repository.update(
        { application_number },
        {
          purpose_of_survey,
          reason_for_examination,
          name_of_object,
          location_of_object,
          client_contact_details,
          status,
        }
      );
    } catch (error) {
      console.error(`[ApplicationRepository.edit]\n${error}`);
      return null;
    }
  }

  public async updateStatus(payload): Promise<any> {
    try {
      const { application_number, status } = payload;
      return this.repository.update(
        { application_number },
        {
          status,
        }
      );
    } catch (error) {
      console.error(`[ApplicationRepository.updateStatus]\n${error}`);
      return null;
    }
  }
}

export { ApplicationRepository };
