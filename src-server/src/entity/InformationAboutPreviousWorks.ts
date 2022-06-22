import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Config from "../configs/config";
import { IMaterialsPreviousWorks } from "./materialsPreviousWorks";
import { ITargetOfApplication } from "./targetOfApplication";

export interface IInformationAboutPreviousWorks {
  previous_works: number;
  type_work: string;
  target_work: string;
  cost_work: number;
  hours_work: number;
  object_name: string;
  surname_manager: string;
  area_object: number;
  materials: IMaterialsPreviousWorks[];
  date_work: Date;
}

@Entity(Config.postgreTabels.informationAboutPreviousWorks)
export class InformationAboutPreviousWorks {
  @PrimaryGeneratedColumn()
  previous_works: number;

  @Column({ nullable: true })
  type_work: string;

  @Column({ nullable: true })
  target_work: string;

  @Column({ nullable: true })
  cost_work: number;

  @Column({ nullable: true })
  hours_work: number;

  @Column({ nullable: true })
  object_name: string;

  @Column({ nullable: true })
  area_object: number;

  @Column({ nullable: true })
  surname_manager: string;

  @Column({ nullable: true })
  date_work: Date;

  @ManyToOne("TargetOfApplication", "previousWorks")
  @JoinColumn({ name: "targetId" })
  target: ITargetOfApplication;

  @OneToMany("MaterialsPreviousWorks", "previousWork")
  materials: IMaterialsPreviousWorks[];
}
