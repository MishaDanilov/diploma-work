import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Config from "../configs/config";

@Entity(Config.postgreTabels.informationAboutEmployees)
export class InformationAboutEmployees {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column()
  employees: string;

  @Column()
  name_of_employee: string;

  @Column()
  surname_of_employee: string;

  @Column()
  post_of_employee: string;

  @Column()
  login: string;

  @Column()
  password: string;
}
