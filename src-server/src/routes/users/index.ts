import * as express from "express";
import { getConnection, getManager } from "typeorm";
import { UsersController } from "../../controller";
import { User } from "../../entity/User";
import { UsersRepository, UsersService } from "../../service";
import Config from "../../configs/config";
import { Employees } from "../../entity/Employees";

const repository = new UsersRepository(getConnection(Config.connectionsName.to_postgre).getRepository(Employees));

const service = new UsersService(repository);

const controller = new UsersController(service);

export default express
  .Router()
  .get("/getUser", controller.getUserByID())
  .get("/subscribe", controller.subscribe())
  .post("/editUser", controller.editUser())
  .post("/editPassword", controller.editUserPassword())

