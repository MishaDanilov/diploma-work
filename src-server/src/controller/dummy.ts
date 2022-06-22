import { Request, Response } from "express";
import { IUsersService } from "../service/users.service";

interface IResponseBody {
  result: any;
  statusMessage: string;
}

class DummyController {
  constructor() {}

  public emptyRequest() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        result: null,
        statusMessage: null,
      };
      try {
        const { token, employeeId, redirect } = request.body;
        responseBody.result = token
        responseBody.statusMessage = 'OK'
        response.status(200).send(responseBody);
      } catch (error) {
        console.error(`[DummyController.emptyRequest]\n${error}`);
        response.status(500).send(null);
      }
    };
  }
}

export { DummyController };
