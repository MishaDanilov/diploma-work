import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Config from "../configs/config";

@Entity(Config.postgreTabels.listOfNecessaryMeasuresForDetailedExamination, {synchronize: false})
export class listOfNecessaryMeasuresForDetailedExamination {
  @PrimaryGeneratedColumn()
  serial_number_of_detailed_examination: number;

  @Column()
  calculation_of_bearing_capacity_of_object: boolean;

  @Column()
  checking_strength_of_concrete_structures: boolean;

  @Column()
  assessment_of_quality_of_binding_devices: boolean;

  @Column()
  evaluation_of_quality_of_partitions: boolean;

  @Column()
  assessment_of_strength_of_suspended_structures: boolean;

  @Column()
  assessment_of_strength_of_fasteners: boolean;
}
