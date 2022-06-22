import * as express from "express";
import usersRouter from "./users";
import registrationRouter from "./registration";
import dummyRouter from "./dummy";
import loginRouter from "./login";
import employeeRouter from "./employees";
import worksRouter from "./works";
import applicationRouter from "./application";
import conclusionRouter from "./conclusion";

const api = express
    .Router()
    .use("/users", usersRouter)
    .use("/registration", registrationRouter)
    .use("/dummy", dummyRouter)
    .use("/login", loginRouter)
    .use("/employee", employeeRouter)
    .use("/works", worksRouter)
    .use("/application", applicationRouter)
    .use("/conclusion", conclusionRouter)

export default api;
