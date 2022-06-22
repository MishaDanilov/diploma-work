import * as express from "express";
import { getConnection, getManager } from "typeorm";
import Config from "../../configs/config";
import { WorksRepository, WorksService } from "../../service";
import { InformationAboutPreviousWorks } from "../../entity/InformationAboutPreviousWorks";
import { WorksController } from "../../controller";

const worksRepository = new WorksRepository(
  getConnection(Config.connectionsName.to_postgre).getRepository(
    InformationAboutPreviousWorks
  )
);

const worksService = new WorksService(worksRepository);

const controller = new WorksController(worksService);

export default express
  .Router()
  .get("/getAllWorks", controller.getAllWorks())
  .get("/getInfoWorks", controller.getInfoWorks())
  .post("/addInfoWorks", controller.addInfoWorks());
