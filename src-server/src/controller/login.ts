import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
import * as jwt from "jsonwebtoken";
import Config from "../configs/config";

interface IResponseBody {
  result: any;
  statusMessage: string;
}

class LoginController {
  private service;
  constructor(service) {
    this.service = service;
  }
  public login() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        const {
          username: login,
          password: withoutEncryptPassword,
        } = request.body;
        const employee = await this.service.findOneUser(login);
        if (!employee) {
          responseBody.result = null;
          responseBody.statusMessage = "неверный логин";
          response.status(400).send(responseBody);
          return;
        }
        const isEqualPassword = await bcrypt.compare(
          withoutEncryptPassword,
          employee.password
        );
        if (!isEqualPassword) {
          responseBody.result = null;
          responseBody.statusMessage = "Неверный пароль";
          response.status(400).json(responseBody);
          return;
        }
        const { employee_id: employeeId, login: employeeLogin } = employee;
        const token = jwt.sign(
          { employeeId, employeeLogin },
          Config.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        responseBody.result = { token, employeeId };
        responseBody.statusMessage = "вход произведен успешно";
        response.send(responseBody);
      } catch (error) {
        console.error(`[LoginController.login]\n${error}`);
        responseBody.result = null;
        responseBody.statusMessage = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }

  public loginAdmin() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        const { username: login, password: password } = request.body;
        const employee = await this.service.findOneEmployee(login);
        if (!employee) {
          responseBody.result = null;
          responseBody.statusMessage = "неверный логин";
          response.status(400).send(responseBody);
          return;
        }

        if (employee.password !== password) {
          responseBody.result = null;
          responseBody.statusMessage = "Неверный пароль";
          response.status(400).json(responseBody);
          return;
        }

        const { employee_id: employeeId, login: employeeLogin } = employee;
        const token = jwt.sign(
          { employeeId, employeeLogin },
          Config.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        responseBody.result = { token, employeeId };
        responseBody.statusMessage = "вход произведен успешно";
        response.send(responseBody);
      } catch (error) {
        console.error(`[LoginController.loginAdmin]\n${error}`);
        responseBody.result = null;
        responseBody.statusMessage = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }
}

export { LoginController };
