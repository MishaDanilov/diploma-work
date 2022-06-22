import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Config from "../configs/config";
import { InformationAboutPreviousWorks } from "./InformationAboutPreviousWorks";

export interface IMaterialsPreviousWorks {
  id: number;
  name: string;
  amount: number;
  previousWork?: InformationAboutPreviousWorks;
}

@Entity(Config.postgreTabels.materialsPreviousWorks)
export class MaterialsPreviousWorks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @ManyToOne("InformationAboutPreviousWorks", "materials")
  @JoinColumn({ name: "previousWorkId" })
  previousWork: InformationAboutPreviousWorks;
}
