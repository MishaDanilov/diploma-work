import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Config from "../configs/config";
import { IMaterials } from "./Materials";
import { ITargetOfApplication } from "./targetOfApplication";

export interface IForecastApplication {
  id: number;
  cost: number;
  time: number;
  target?: ITargetOfApplication;
  materials?: IMaterials[];
}

@Entity(Config.postgreTabels.forecastApplication)
export class ForecastApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  cost: number;

  @Column({ nullable: true })
  time: number;

  @OneToMany("TargetOfApplication", "forecast")
  targets: ITargetOfApplication[];

  @OneToMany("Materials", "forecast")
  materials: IMaterials[];
}
