import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Config from "../configs/config";

@Entity(Config.postgreTabels.technicalConclusion)
export class TechnicalConclusion {
  @PrimaryGeneratedColumn()
  serial_number_of_TK: number;

  @Column({ nullable: true })
  results_of_preliminary_inspection: string;

  @Column({ nullable: true, default: false })
  results_of_general_survey: boolean;

  @Column({ nullable: true })
  results_of_detailed_survey: string;

  @Column({ nullable: true })
  damaged_elements_of_object: string;

  @Column({ nullable: true })
  necessary_measures_to_improve_facility: string;

  @Column({ nullable: true })
  client_id: number;
}
