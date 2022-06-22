import * as express from "express";
import { getConnection, getManager } from "typeorm";
import { RegistrationController } from "../../controller";
import Config from "../../configs/config";
import { Employees } from "../../entity/Employees";
import { RegistrationRepository, RegistrationService } from "../../service";

const repository = new RegistrationRepository(getConnection(Config.connectionsName.to_postgre).getRepository(Employees));

const service = new RegistrationService(repository);

const controller = new RegistrationController(service);

export default express.Router().post("", controller.registration());
