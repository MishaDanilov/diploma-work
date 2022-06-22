import Config from "../configs/config";

import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const jwtMonster = (req: Request, res: Response, next: NextFunction) => {
  if (
    Config.publicRoutes.includes(req.originalUrl.toString()) ||
    req.method === "OPTIONS"
  ) {
    next();
  } else {
    try {
      const header = req.header(Config.headerName);
      if (header) {
        jwt.verify(header, Config.JWT_SECRET_KEY);
      } else {
        res.redirect("/");
        return;
      }
      next();
    } catch (error) {
      res.sendStatus(401);
    }
  }
};
