import * as express from "express";
import { getConnection, getManager } from "typeorm";
import { DummyController } from "../../controller";
import Config from "../../configs/config";

const controller = new DummyController();

export default express.Router().post("", controller.emptyRequest());
