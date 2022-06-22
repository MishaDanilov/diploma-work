import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import Config from "../configs/config";
import { IApplicationForWork } from "./ApplicationForWork";
import { IForecastApplication } from "./forecastApplication";
import { IInformationAboutPreviousWorks } from "./InformationAboutPreviousWorks";

export interface ITargetOfApplication {
  id: number;
  target: string;
  application?: IApplicationForWork;
  forecast?: IForecastApplication;
}

@Entity(Config.postgreTabels.targetOfApplication)
export class TargetOfApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  target: string;

  @OneToMany("ApplicationForWork", "target")
  applications: IApplicationForWork[];

  @OneToMany("InformationAboutPreviousWorks", "target")
  previousWorks: IInformationAboutPreviousWorks[];

  @ManyToOne("ForecastApplication", "targets")
  @JoinColumn({ name: "forecastId" })
  forecast: IForecastApplication;
}
