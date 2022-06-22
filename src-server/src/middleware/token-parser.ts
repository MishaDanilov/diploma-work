import Config from "../configs/config";

import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function tokenParser(req: Request, res: Response, next: NextFunction) {
  jwt.verify(
    req.header(Config.headerName),
    Config.JWT_SECRET_KEY,
    (err, decoded) => {
      req["decodedToken"] = decoded;
    }
  );
  next();
}
