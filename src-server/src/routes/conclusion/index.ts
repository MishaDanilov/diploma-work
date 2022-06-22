import * as express from "express";
import { getConnection, getManager } from "typeorm";
import { ConclusionController, UsersController } from "../../controller";
import { ConclusionRepository, ConclusionService } from "../../service";
import Config from "../../configs/config";
import { Employees } from "../../entity/Employees";
import { TechnicalConclusion } from "../../entity/TechnicalConclusion";

const repository = new ConclusionRepository(getConnection(Config.connectionsName.to_postgre).getRepository(TechnicalConclusion));

const service = new ConclusionService(repository);

const controller = new ConclusionController(service);

export default express
  .Router()
  .get("/getConclusion", controller.getConclusion())
  .post("/addConclusion", controller.addConclusion())
  .put("/editConclusion", controller.editConclusion())
  .delete("/deleteConclusion/:id", controller.deleteConclusion())

