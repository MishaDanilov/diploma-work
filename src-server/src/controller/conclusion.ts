import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
import * as jwt from "jsonwebtoken";
import Config from "../configs/config";

interface IResponseBody {
  status: any;
  message: string;
}

class ConclusionController {
  private service;

  constructor(service) {
    this.service = service;
  }

  public getConclusion() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const conclusions = await this.service.findAll();
        console.log(conclusions);
        responseBody.status = true;
        responseBody.message = conclusions;
        response.send(responseBody);
      } catch (error) {
        console.error(`[ConclusionController.getConclusion]\n${error}`);
        responseBody.status = false;
        responseBody.message = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }

  public addConclusion() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const payload = request.body;
        const conclusionAdded = await this.service.add(payload);
        responseBody.status = true;
        responseBody.message = conclusionAdded;
        response.send(responseBody);
      } catch (error) {
        console.error(`[ConclusionController.addConclusion]\n${error}`);
        responseBody.status = false;
        responseBody.message = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }

  public editConclusion() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const payload = request.body;
        console.log(payload);
        const conclusionUpdated = await this.service.update(payload);
        responseBody.status = true;
        responseBody.message = conclusionUpdated;
        response.send(responseBody);
      } catch (error) {
        console.error(`[ConclusionController.addConclusion]\n${error}`);
        responseBody.status = false;
        responseBody.message = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }

  public deleteConclusion() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const { id } = request.params;
        const conclusionDeleted = await this.service.delete(id);
        responseBody.status = true;
        responseBody.message = id;
        response.send(responseBody);
      } catch (error) {
        console.error(`[ConclusionController.addConclusion]\n${error}`);
        responseBody.status = false;
        responseBody.message = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }
}

export { ConclusionController };
