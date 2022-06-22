import { Request, Response } from "express";
import * as pug from "pug";
import * as path from "path";
var fs = require("fs");
import * as nodemailer from "nodemailer";
import { format } from "date-fns";
import {
  ApplicationForWork,
  IApplicationForWork,
} from "../entity/ApplicationForWork";
import { IInformationAboutPreviousWorks } from "src/entity/InformationAboutPreviousWorks";
import { Employees } from "src/entity/Employees";

interface IResponseBody {
  status: any;
  message: any;
  applications?: any;
  application?: any;
  header?: any;
}

class ApplicationController {
  private service;
  private employeeService;

  constructor(service, employeeService) {
    this.service = service;
    this.employeeService = employeeService;
  }

  public getApplication() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const employeeId = request["decodedToken"].employeeId;
        const applications: ApplicationForWork[] = await this.service.findAllById(
          employeeId
        );
        if (applications.length) {
          responseBody.status = true;
          responseBody.message = applications;
          response.send(responseBody);
        } else {
          responseBody.status = false;
          responseBody.message = "Something went wrong!";
          response.send(responseBody);
        }
      } catch (error) {
        console.log(error.message);
        responseBody.status = false;
        responseBody.message = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }

  public getAllApplications() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: true,
        message: null,
      };
      try {
        const applications: IApplicationForWork[] = await this.service.findAll();
        const preparedApplications = applications.map((application) => {
          return {
            ...application,
            date_of_creation: format(
              application.date_of_creation,
              "dd MMM yyyy, HH:mm 'UTC'"
            ),
          };
        });
        responseBody.status = true;
        responseBody.message = preparedApplications;
        responseBody.header = [
          "номер заявки",
          "цель обследования",
          "причина обследования",
          "название объекта",
          "площадь объекта",
          "расположение объекта",
          "контактные данные клиента",
          "дата создания",
          "статус",
        ];
        response.send(responseBody);
      } catch (error) {
        console.log(error.message);
        responseBody.status = false;
        responseBody.message = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }

  public addApplication() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const client_id = request["decodedToken"].employeeId;
        const {
          target: purpose_of_survey,
          targetSelect: target,
          reason: reason_for_examination,
          title: name_of_object,
          address: location_of_object,
          email: client_contact_details,
          area: area_object,
        } = request.body;
        const date_of_creation = new Date().toISOString();
        const application = await this.service.create({
          client_id,
          purpose_of_survey,
          reason_for_examination,
          name_of_object,
          location_of_object,
          client_contact_details,
          date_of_creation,
          area_object: Number(area_object) ? area_object : 0,
          target,
        });
        if (application) {
          responseBody.status = true;
          responseBody.message = "Заявка добавленна";
          responseBody.applications = application;
          response.send(responseBody);
        } else {
          responseBody.status = false;
          responseBody.message = "Заявка не добавленна";
          response.send(responseBody);
        }
      } catch (error) {
        console.log(error.message);
        responseBody.status = false;
        responseBody.message = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }

  public forecastApplication() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const { num: application_number } = request.body;
        const application: ApplicationForWork = await this.service.findOneWithForecast(
          application_number
        );
        const data = {
          workHours: application.target.forecast.time,
          workCost: application.target.forecast.cost,
          materials: application.target.forecast.materials,
          nameObject: application.name_of_object,
        };
        responseBody.status = true;
        responseBody.message = data;
        response.send(responseBody);
      } catch (error) {
        console.log(error.message);
        responseBody.status = false;
        responseBody.message = {};
        response.status(500).send(responseBody);
      }
    };
  }

  public getTargets() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const targets = await this.service.findTargets();

        responseBody.status = true;
        responseBody.message = targets;
        response.send(responseBody);
      } catch (error) {
        console.log(error.message);
        responseBody.status = false;
        responseBody.message = [];
        response.status(500).send(responseBody);
      }
    };
  }

  public editApplication() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const {
          num: application_number,
          target: purpose_of_survey,
          reason: reason_for_examination,
          title: name_of_object,
          placeobject: location_of_object,
          contactData: client_contact_details,
          statusAppliction: status,
        } = request.body;

        const payload = {
          application_number,
          purpose_of_survey,
          reason_for_examination,
          name_of_object,
          location_of_object,
          client_contact_details,
          status: Boolean(Number(status)),
        };

        await this.service.edit(payload);
        const application = await this.service.findOne(application_number);
        responseBody.status = true;
        responseBody.message = "Заявка изменена";
        responseBody.application = application;
        response.send(responseBody);
      } catch (error) {
        console.log(error.message);
        responseBody.status = false;
        responseBody.message = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }

  public approveApplication() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const { num: application_number } = request.body;

        const payload = {
          application_number,
          status: true,
        };

        await this.service.updateStatus(payload);
        const application: IApplicationForWork = await this.service.findOne(
          application_number
        );

        const user: Employees = await this.employeeService.findById(
          application.client_id
        );

        responseBody.status = true;
        responseBody.message = "Заявка изменена";
        responseBody.application = application;
        response.send(responseBody);

        const applicationWithForecast: ApplicationForWork = await this.service.findOneWithForecast(
          application_number
        );

        const data = {
          workHours: applicationWithForecast.target.forecast.time,
          workCost: applicationWithForecast.target.forecast.cost,
          materials: applicationWithForecast.target.forecast.materials,
          nameObject: applicationWithForecast.name_of_object,
        };

        const html = `<!--[if lte mso 12]><table border='0' cellpadding='0' cellspacing='0' style='width: 500px; font-family: Arial, sans-serif; font-size: 0; line-height: 0; padding: 0; margin: 0; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; margin: 0 auto; box-shadow: 0 0 8px rgba(0,0,0,0.1);'><![endif]-->
        <!--[if gte mso 14]><table border='0' cellpadding='0' cellspacing='0' style='width: 600px; font-family: Arial, sans-serif; font-size: 0; line-height: 0; padding: 0; margin: 0; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; margin: 0 auto; box-shadow: 0 0 8px rgba(0,0,0,0.1);'><![endif]-->
        <!--[if !mso]><!--><table
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="
            width: 600px;
            font-family: Arial, sans-serif;
            font-size: 0;
            line-height: 0;
            padding: 0;
            margin: 0;
            border-spacing: 0;
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            box-sizing: border-box;
            margin: 0 auto;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
          "
        ><!--<![endif]-->
          <tr style="padding: 0; margin: 0; font-size: 0;">
            <td style="padding: 0; margin: 0;">
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="
                  font-family: Arial, sans-serif;
                  font-size: 0;
                  line-height: 0;
                  padding: 0;
                  margin: 0;
                  border-spacing: 0;
                  border-collapse: collapse;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  box-sizing: border-box;
                  width: 100%;
                "
              >
                <tr style="padding: 0; margin: 0; font-size: 0;">
                  <td style="padding: 0; margin: 0;">
                    <img
                      alt="header"
                      src="https://1s-mp.ru/wp-content/uploads/2016/06/spasibo-text-600x113.png"
                      width="600"
                      style="width: 100%; height: auto;"
                    />
                  </td>
                </tr>
              </table>
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="
                  font-family: Arial, sans-serif;
                  font-size: 0;
                  line-height: 0;
                  padding: 0;
                  margin: 0;
                  border-spacing: 0;
                  border-collapse: collapse;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  box-sizing: border-box;
                  width: 100%;
                  background-color: #fff;
                  border-width: 0 0.5px;
                  border-color: rgba(0, 0, 0, 0.05);
                  border-style: solid;
                  mso-border-right-alt: solid gainsboro 0.5px;
                  mso-border-left-alt: solid gainsboro 0.5px;
                  mso-border-top-alt: none;
                  mso-border-bottom-alt: none;
                "
              >
                <tr style="padding: 0; margin: 0; font-size: 0;">
                  <td style="padding: 0; margin: 0; padding: 0 30px 120px;">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, sans-serif;
                        font-size: 0;
                        line-height: 0;
                        padding: 0;
                        margin: 0;
                        border-spacing: 0;
                        border-collapse: collapse;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        box-sizing: border-box;
                      "
                    >
                      <tr style="padding: 0; margin: 0; font-size: 0;">
                        <td style="padding: 0; margin: 0; padding-top: 15px;">
                          <p
                            style="
                              color: #4c4c4c;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 24px;
                              margin: 10px 0;
                              color: #222222;
                              font-size: 32px;
                              font-weight: bold;
                              line-height: 48px;
                            "
                          >
                            Здравствуйте ${user.name},
                          </p>
                        </td>
                      </tr>
                      <tr style="padding: 0; margin: 0; font-size: 0;">
                        <td style="padding: 0; margin: 0;">
                          <p
                            style="
                              color: #4c4c4c;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 24px;
                              margin: 10px 0;
                            "
                          >
                          Ваша заявка на обследование строительного объекта «${
                            data.nameObject
                          }» принята.
                          </p>
                        </td>
                      </tr>
                      <tr style="padding: 0; margin: 0; font-size: 0;">
                        <td style="padding: 0; margin: 0; padding: 24px 0;">
                          <table
                            style="
                              box-sizing: border-box;
                              border-spacing: 0;
                              border-collapse: collapse;
                            "
                          >
                            <tr>
                              <td
                                style="
                                  border: 1px solid #464547;
                                  padding: 8px;
                                  width: 34%;
                                "
                              >
                                <p
                                  style="
                                    color: #4c4c4c;
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    margin: 10px 0;
                                    font-weight: bold;
                                    font-size: 12px;
                                  "
                                >
                                  Название объекта:
                                </p>
                              </td>
                              <td
                                style="
                                  border: 1px solid #464547;
                                  padding: 8px;
                                  width: 24%;
                                "
                              >
                                <p
                                  style="
                                    color: #4c4c4c;
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    margin: 10px 0;
                                    font-weight: bold;
                                    font-size: 12px;
                                  "
                                >
                                  Приблизительное время выполнения работы:
                                </p>
                              </td>
                              <td
                                style="
                                  border: 1px solid #464547;
                                  padding: 8px;
                                  width: 24%;
                                "
                              >
                                <p
                                  style="
                                    color: #4c4c4c;
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    margin: 10px 0;
                                    font-weight: bold;
                                    font-size: 12px;
                                  "
                                >
                                  Стоимость работы:
                                </p>
                              </td>
                              <td
                                style="
                                  border: 1px solid #464547;
                                  padding: 8px;
                                  width: 26%;
                                "
                              >
                                <p
                                  style="
                                    color: #4c4c4c;
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    margin: 10px 0;
                                    font-weight: bold;
                                    font-size: 12px;
                                  "
                                >
                                  Дата создания заявки:
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style="
                                  border: 1px solid #464547;
                                  padding: 8px;
                                  width: 34%;
                                  overflow-wrap: anywhere;
                                  word-break: break-all;
                                "
                              >
                                <p
                                  style="
                                    color: #4c4c4c;
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    margin: 10px 0;
                                    font-size: 12px;
                                  "
                                >
                                  ${data.nameObject}
                                </p>
                              </td>
                              <td
                                style="
                                  border: 1px solid #464547;
                                  padding: 8px;
                                  width: 24%;
                                  overflow-wrap: anywhere;
                                  word-break: break-all;
                                "
                              >
                                <p
                                  style="
                                    color: #4c4c4c;
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    margin: 10px 0;
                                    font-size: 12px;
                                  "
                                >
                                  ${data.workHours} ч.
                                </p>
                              </td>
                              <td
                                style="
                                  border: 1px solid #464547;
                                  padding: 8px;
                                  width: 24%;
                                  overflow-wrap: anywhere;
                                  word-break: break-all;
                                "
                              >
                                <p
                                  style="
                                    color: #4c4c4c;
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    margin: 10px 0;
                                    font-size: 12px;
                                  "
                                >
                                ${data.workCost} у.е.
                                </p>
                              </td>
                              <td
                                style="
                                  border: 1px solid #464547;
                                  padding: 8px;
                                  width: 26%;
                                  overflow-wrap: anywhere;
                                  word-break: break-all;
                                "
                              >
                                <p
                                  style="
                                    color: #4c4c4c;
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    margin: 10px 0;
                                    font-size: 12px;
                                  "
                                >
                                  ${format(
                                    application.date_of_creation,
                                    "dd MMM yyyy, HH:mm 'UTC'"
                                  )}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="
                  font-family: Arial, sans-serif;
                  font-size: 0;
                  line-height: 0;
                  padding: 0;
                  margin: 0;
                  border-spacing: 0;
                  border-collapse: collapse;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  box-sizing: border-box;
                  width: 100%;
                  background-color: #222;
                "
              >
                <tr style="padding: 0; margin: 0; font-size: 0;">
                  <td
                    style="
                      padding: 0;
                      margin: 0;
                      text-align: center;
                      padding-top: 26px;
                      padding-bottom: 26px;
                    "
                  >
                    <p
                      style="
                        color: #4c4c4c;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 24px;
                        margin: 10px 0;
                        color: #b2b2b2;
                        font-size: 12px;
                        line-height: 12px;
                        margin: 0;
                      "
                    >
                      © 2022 Construction Company, Inc. All Rights Reserved
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        `;

        const transporter = nodemailer.createTransport(
          {
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
              user: "construction_company194@mail.ru",
              pass: "uXQZVHKxE55kp9HeRpQK",
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
          {
            from: "Construction Company <construction_company194@mail.ru>",
          }
        );

        const message = {
          to: user.email,
          subject: "Ваша заявка принята",
          html,
        };

        const info = await transporter.sendMail(message);

        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.log(error.message);
        responseBody.status = false;
        responseBody.message = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }

  public deleteApplication() {
    return async (request: Request, response: Response): Promise<void> => {
      let responseBody: IResponseBody = {
        status: null,
        message: null,
      };
      try {
        const { id } = request.params;

        await this.service.delete(id);
        responseBody.status = true;
        responseBody.message = "Заявка удалена";
        responseBody.application = { application_number: id };
        response.send(responseBody);
      } catch (error) {
        console.log(error.message);
        responseBody.status = false;
        responseBody.message = "Something went wrong!";
        response.status(500).send(responseBody);
      }
    };
  }
}

export { ApplicationController };
