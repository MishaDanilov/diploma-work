import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Config from "../configs/config";

@Entity(Config.postgreTabels.listOfGeneralSurveyMeasures, {synchronize: false})
export class ListOfGeneralSurveyMeasures {
  @PrimaryGeneratedColumn()
  serial_number_of_general_survey: number;

  @Column()
  search_for_low_quality_masonry: boolean;

  @Column()
  search_for_cracks_in_concreting: boolean;

  @Column()
  presence_of_deformation_of_foundation: boolean;

  @Column()
  checking_documentation_of_object: boolean;

  @Column()
  object_ownership_rights: boolean;

  @Column()
  serial_number_of_TK: number;
}
