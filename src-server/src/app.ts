import * as express from "express";
import { createConnection, Connection, getConnection } from "typeorm";
import * as expressWs from "express-ws";
import * as https from "https";
import Config from "./configs/config";
import { errorHandler } from "./middleware";
import { ErrorCommon } from "./common";
const cors = require('cors')
import { jwtMonster } from "./middleware";
import { tokenParser } from "./middleware";

export class App {
  private static app = expressWs(express()).app;

  private static port = Config.server.port;

  private static postgreConnection: Connection;

  private static async initServer(): Promise<void> {
    const globalHttpsOptions = https.globalAgent.options;
    globalHttpsOptions.rejectUnauthorized = false;
    const { default: router } = require("./routes");
    this.app.disable("x-powered-by");
    this.app.use(express.json({ limit: "500mb" }));
    this.app.use(express.urlencoded({ limit: "500mb", extended: true }));
    this.app.use(jwtMonster)
    this.app.use(tokenParser)
    const corsOptions = {
      origin: function (origin, callback) {
        if (Config.whitelist.includes(origin)) {
          callback(null, true);
        } else {
          callback(new ErrorCommon("Not allowed by CORS", 500));
        }
      },
    };
    this.app.use("/", cors(corsOptions), router);
    this.app.use((req, res, next) => {
      const err = new ErrorCommon("Page Not Found", 404);
      next(err);
    });
    this.app.use(errorHandler);
  }

  private static async connectPostgre(): Promise<void> {
    this.postgreConnection = await createConnection(
      Config.connectionsName.to_postgre
    );
  }

  public static async start(): Promise<void> {
    try {
      await this.connectPostgre();

      await this.initServer();
      this.app.listen(this.port, () =>
        console.log(`Application is up and running on port ${this.port}!`)
      );
    } catch (err) {
      console.log(err);
      if (this.postgreConnection && this.postgreConnection.isConnected)
        this.postgreConnection.close();
    }
  }
}
