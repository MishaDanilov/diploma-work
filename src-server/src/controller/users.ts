const bcrypt = require("bcryptjs");
import { Request, Response } from "express";
import { IUsersService } from "../service/users.service";

interface IResponseBody {
  result: any;
  statusMessage: string;
}

interface IResponseStatusBody {
  status: boolean;
  message: string;
}

class UsersController {
  private service: IUsersService;

  constructor(service: IUsersService) {
    this.service = service;
  }

  public getAllUsers() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        const users = await this.service.readAll();
        response.status(200).send(users);
      } catch (error) {
        console.log(error.message);
        responseBody.result = null;
        responseBody.statusMessage = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }

  public getUserByID() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        const employeeId = request["decodedToken"].employeeId;
        const user = await this.service.readById(employeeId);
        response.send(user);
      } catch (error) {
        console.log(error.message);
        responseBody.result = null;
        responseBody.statusMessage = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }

  public createUser() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        response.send([]);
      } catch (error) {
        console.log(error.message);
        responseBody.result = null;
        responseBody.statusMessage = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }

  public editUser() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseStatusBody = {
        status: true,
        message: "Изменения приняты",
      };
      try {
        const employeeId = request["decodedToken"].employeeId;
        await this.service.updateById(employeeId, request.body);
        response.send(responseBody);
      } catch (error) {
        console.log(error.message);
        responseBody.status = null;
        responseBody.message = "Что-то пошло не так!";
        response.status(500).send(responseBody);
      }
    };
  }

  public editUserPassword() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseStatusBody = {
        status: true,
        message: "Пароль изменен",
      };
      try {
        const employeeId = request["decodedToken"].employeeId;
        const user = await this.service.readById(employeeId);
        const { oldpassword, newPassword } = request.body;
        const isEqualPassword = await bcrypt.compare(
          oldpassword,
          user.password
        );
        if (!isEqualPassword) {
          responseBody.status = false;
          responseBody.message = "Неверный пароль";
          response.status(400).json(responseBody);
          return;
        }
        const password = await bcrypt.hash(newPassword, 12);
        await this.service.updateById(employeeId, { password });
        response.send(responseBody);
      } catch (error) {
        console.log(error.message);
        responseBody.status = null;
        responseBody.message = "Что-то пошло не так!";
        response.status(500).send(responseBody);
      }
    };
  }

  public deleteUser() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        response.send([]);
      } catch (error) {
        console.log(error.message);
        responseBody.result = null;
        responseBody.statusMessage = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }

  public subscribe() {
    return async (request: Request, response: Response): Promise<void> => {
      try {
        const employeeId = request["decodedToken"].employeeId;
        await this.service.updateById(employeeId, {
          subscription_status: true,
        });
        response.status(200).send({ status: true });
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ status: false });
      }
    };
  }
}

export { UsersController };
