import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
import * as jwt from "jsonwebtoken";
import Config from "../configs/config";

interface IResponseBody {
  result: any;
  statusMessage: string;
}

class RegistrationController {
  private service;

  constructor(service) {
    this.service = service;
  }

  public registration() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        const {
          username: login,
          password: withoutEncryptPassword,
          email,
          name,
          surname,
        } = request.body;
        const isExist = await this.service.findOne(login);
        if (isExist) {
          responseBody.result = null;
          responseBody.statusMessage = "Такой пользователь существует";
          response.status(400).send(responseBody);
          return;
        }
        const password = await bcrypt.hash(withoutEncryptPassword, 12);
        const employee = await this.service.create({
          login,
          password,
          email,
          name,
          surname,
        });
        if (!employee) {
          responseBody.result = null;
          responseBody.statusMessage = "Что-то пошло не так";
          response.status(500).send(responseBody);
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
        responseBody.statusMessage = "Пользователь создан";
        response.send(responseBody);
      } catch (error) {
        console.error(`[RegistrationController.registration]\n${error}`);
        responseBody.result = null;
        responseBody.statusMessage = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }
}

export { RegistrationController };
