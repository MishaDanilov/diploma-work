import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Config from "../configs/config";
import { IForecastApplication } from "./forecastApplication";

export interface IMaterials {
  id: number;
  name: string;
  amount: number;
  limit: number;
  forecast?: IForecastApplication;
}

@Entity(Config.postgreTabels.materials)
export class Materials {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  limit: number;

  @ManyToOne("ForecastApplication", "materials")
  @JoinColumn({ name: "forecastId" })
  forecast: IForecastApplication;
}
