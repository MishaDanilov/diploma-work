import * as express from "express";
import { getConnection, getManager } from "typeorm";
import { EmployeeController } from "../../controller";
import Config from "../../configs/config";
import { Employees } from "../../entity/Employees";
import {
  EmployeeRepository,
  EmployeeService,
  InformationAboutEmployeesRepository,
  InformationAboutEmployeesService,
} from "../../service";
import { InformationAboutEmployees } from "../../entity/InformationAboutEmployees";

const employeeRepository = new EmployeeRepository(
  getConnection(Config.connectionsName.to_postgre).getRepository(Employees)
);

const informationAboutEmployeesRepository = new InformationAboutEmployeesRepository(
  getConnection(Config.connectionsName.to_postgre).getRepository(
    InformationAboutEmployees
  )
);

const employeeService = new EmployeeService(employeeRepository);

const informationAboutEmployeesService = new InformationAboutEmployeesService(
  informationAboutEmployeesRepository
);

const controller = new EmployeeController(
  employeeService,
  informationAboutEmployeesService
);

export default express
  .Router()
  .get("/getEmployees", controller.getEmployees())
  .get("/getEmployee", controller.getEmployee())
  .get("/getInfoEmployee", controller.getInfoEmployee());
