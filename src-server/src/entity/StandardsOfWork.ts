import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Config from "../configs/config";

@Entity(Config.postgreTabels.standardsOfWork)
export class StandardsOfWork {
  @PrimaryGeneratedColumn()
  serial_number_of_work: number;

  @Column()
  documentation: string;

  @Column()
  purpose_of_object_survey: string;

  @Column()
  list_of_resources: string;

  @Column()
  required_materials: string;

  @Column()
  costs_of_work: number;

  @Column()
  limit_on_use_of_materials: number;

  @Column()
  budget: number;
}
