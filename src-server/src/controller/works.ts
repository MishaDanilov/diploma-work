import { Request, Response } from "express";
import { format } from "date-fns";
const bcrypt = require("bcryptjs");
import * as jwt from "jsonwebtoken";
import Config from "../configs/config";

interface IResponseBody {
  status: any;
  message?: any;
  header?: any;
}

class WorksController {
  private worksService;

  constructor(worksService) {
    this.worksService = worksService;
  }

  public getInfoWorks() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const previousWorks = await this.worksService.findAll();
        response.send(previousWorks);
      } catch (error) {
        console.error(`[WorksController.getInfoWorks]\n${error}`);
        responseBody.status = false;
        responseBody.message = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }

  public addInfoWorks() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const {
          id: previous_works,
          type_work,
          target_work,
          cost_work,
          hours_work,
          object_name,
          area_object,
          surname_manager,
          date_work,
        } = request.body;
        let previousWork = await this.worksService.create({
          type_work,
          target_work,
          cost_work: Number(cost_work) ? cost_work : 0,
          hours_work: Number(hours_work) ? hours_work : 0,
          area_object: Number(area_object) ? area_object : 0,
          object_name,
          surname_manager,
          date_work: date_work ? new Date(date_work) : new Date(),
        });
        previousWork = {
          ...previousWork,
          date_work: format(previousWork.date_work, "dd MMM yyyy, HH:mm 'UTC'"),
        };
        responseBody.status = true;
        responseBody.message = previousWork;
        response.send(responseBody);
      } catch (error) {
        console.error(`[WorksController.addInfoWorks]\n${error}`);
        responseBody.status = false;
        responseBody.message = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }

  public getAllWorks() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
        header: null,
      };
      try {
        let previousWorks = await this.worksService.find();
        previousWorks = previousWorks.map((previousWork) => {
          return {
            ...previousWork,
            date_work: format(
              previousWork.date_work,
              "dd MMM yyyy, HH:mm 'UTC'"
            ),
          };
        });
        responseBody.status = true;
        responseBody.message = previousWorks;
        responseBody.header = [
          "номер работы",
          "тип работы",
          "цель работы",
          "стоимость работы",
          "время работы",
          "название объекта",
          "площадь объекта",
          "фамилия руководителя",
          "дата начала работы",
        ];
        console.log(responseBody);

        response.send(responseBody);
      } catch (error) {
        console.error(`[WorksController.getAllWorks]\n${error}`);
        responseBody.status = false;
        responseBody.message = "Что-то пошло не так";
        response.status(500).send(responseBody);
      }
    };
  }
}

export { WorksController };
