import * as express from "express";
import { getConnection, getManager } from "typeorm";
import { LoginController } from "../../controller";
import Config from "../../configs/config";
import { Employees } from "../../entity/Employees";
import { LoginRepository, LoginService } from "../../service";
import { InformationAboutEmployees } from "../../entity/InformationAboutEmployees";

const repositoryUsers = new LoginRepository(
  getConnection(Config.connectionsName.to_postgre).getRepository(Employees),
  getConnection(Config.connectionsName.to_postgre).getRepository(InformationAboutEmployees)
);
const serviceUsers = new LoginService(repositoryUsers);

const controller = new LoginController(serviceUsers);

export default express
  .Router()
  .post("", controller.login())
  .post("/admin", controller.loginAdmin());
