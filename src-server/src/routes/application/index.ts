import * as express from "express";
import { getConnection, getManager } from "typeorm";
import { ApplicationController } from "../../controller";
import { ApplicationForWork } from "../../entity/ApplicationForWork";
import { ApplicationService, ApplicationRepository, EmployeeRepository, EmployeeService } from "../../service";
import Config from "../../configs/config";
import { Employees } from "../../entity/Employees";
import { TargetOfApplication } from "../../entity/targetOfApplication";

const repository = new ApplicationRepository(getConnection(Config.connectionsName.to_postgre).getRepository(ApplicationForWork));
const targetRepository = getConnection(Config.connectionsName.to_postgre).getRepository(TargetOfApplication);

const employeeRepository = new EmployeeRepository(
  getConnection(Config.connectionsName.to_postgre).getRepository(Employees)
);

const employeeService = new EmployeeService(employeeRepository);

const service = new ApplicationService(repository, targetRepository);

const controller = new ApplicationController(service, employeeService);

export default express
  .Router()
  .post("/addApplication", controller.addApplication())
  .get("/getApplication", controller.getApplication())
  .get("/getAllApplications", controller.getAllApplications())
  .get("/getTargets", controller.getTargets())
  .post("/editApplication", controller.editApplication())
  .post("/forecastApplication", controller.forecastApplication())
  .put("/approveApplication", controller.approveApplication())
  .delete("/deleteApplication/:id", controller.deleteApplication())

