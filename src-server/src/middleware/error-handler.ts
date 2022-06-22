import { ErrorCommon } from "../common"

export function errorHandler(err, req, res, next) {
    res.status(err.status).end(err.message)
}