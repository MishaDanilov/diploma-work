import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Config from "../configs/config";

@Entity(Config.postgreTabels.administration)
export class Administration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serial_number_of_work: number;

  @Column()
  serial_number_of_general_survey: number;

  @Column()
  serial_number_of_detailed_examination: number;

  @Column()
  serial_number_of_warehouse_accounting: number;

  @Column()
  employee: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  post: string;

  @Column()
  employee_id: number;
}
