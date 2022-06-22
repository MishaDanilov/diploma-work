import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
import * as jwt from "jsonwebtoken";
import Config from "../configs/config";

interface IResponseBody {
  result: any;
  statusMessage: string;
}

interface IResponseBodySecond {
  status: any;
  message: any;
  infoMessage?: any;
  header?: any;
}

class EmployeeController {
  private employeeService;
  private informationAboutEmployeesService;

  constructor(employeeService, informationAboutEmployeesService) {
    this.employeeService = employeeService;
    this.informationAboutEmployeesService = informationAboutEmployeesService;
  }

  public getEmployees() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBodySecond: IResponseBodySecond = {
        status: null,
        message: null,
      };
      try {
        const employees = await this.employeeService.find();
        responseBodySecond.status = true;
        responseBodySecond.message = employees;
        responseBodySecond.header = [
          "номер клиента",
          "имя",
          "фамилия",
          "логин",
          "почта",
          "статус подписки",
        ];
        console.log(responseBodySecond);

        response.send(responseBodySecond);
      } catch (error) {
        console.error(`[EmployeeController.getEmployee]\n${error}`);
        responseBodySecond.status = false;
        responseBodySecond.infoMessage = "Что-то пошло не так";
        response.status(500).send(responseBodySecond);
      }
    };
  }

  public getEmployee() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        const { employeeLogin: login } = request["decodedToken"];
        const employee = await this.employeeService.findOne(login);
        response.send(employee);
      } catch (error) {
        console.error(`[EmployeeController.getEmployee]\n${error}`);
        responseBody.result = null;
        responseBody.statusMessage = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }

  public getInfoEmployee() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        const employees = await this.informationAboutEmployeesService.findAll();
        response.send(employees);
      } catch (error) {
        console.error(`[EmployeeController.getInfoEmployee]\n${error}`);
        responseBody.result = null;
        responseBody.statusMessage = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }
}

export { EmployeeController };
