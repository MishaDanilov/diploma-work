import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Config from "../configs/config";
import { IEmployees } from "./Employees";
import { ITargetOfApplication } from "./targetOfApplication";

export interface IApplicationForWork {
  application_number: number;
  purpose_of_survey: string;
  reason_for_examination: string;
  name_of_object: string;
  location_of_object: string;
  client_contact_details: string;
  client_id?: number;
  date_of_creation: Date;
  status: boolean;
  target?: ITargetOfApplication;
}

@Entity(Config.postgreTabels.applicationForWork)
export class ApplicationForWork {
  @PrimaryGeneratedColumn()
  application_number: number;

  @Column({ nullable: true })
  purpose_of_survey: string;

  @Column({ nullable: true })
  reason_for_examination: string;

  @Column({ nullable: true })
  name_of_object: string;

  @Column({ nullable: true })
  location_of_object: string;

  @Column({ nullable: true })
  client_contact_details: string;

  @Column({ nullable: true })
  client_id: number;

  @Column({ nullable: true })
  area_object: number;

  @Column({ nullable: true })
  date_of_creation: Date;

  @Column({ default: false })
  status: boolean;

  @ManyToOne("TargetOfApplication", "applications")
  @JoinColumn({ name: "targetId" })
  target: ITargetOfApplication;

  @ManyToOne("Employees", "applications")
  @JoinColumn({ name: "client_id" })
  client: IEmployees;
}
