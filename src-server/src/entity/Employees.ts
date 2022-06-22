import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Config from "../configs/config";
import { IApplicationForWork } from "./ApplicationForWork";

export interface IEmployees {
  employee_id: number;
  name: string;
  surname: string;
  login: string;
  email: string;
  password: string;
  subscription_status: boolean;
  applications: IApplicationForWork[];
}

@Entity(Config.postgreTabels.employees)
export class Employees {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  subscription_status: boolean;

  @OneToMany("ApplicationForWork", "client")
  applications: IApplicationForWork[];
}
