import logger from "@cofig/logger";
import { CustomError } from "@utils";
import { NextFunction, Request, Response } from "express";

const ServerError =
  () => (err: any, req: Request, res: Response, _next: NextFunction) => {
    let message = "";
    if (err instanceof CustomError)
      return res.status(err.statusCode).json(err.serializeErrors());
    logger.debug("ServerError");

    if (Array.isArray(err.error)) {
      message = err.error.map((e: any) => `${e.param}: ${e.msg}`).toString();
    } else {
      message = !err.error
        ? err.message
        : `${err.error.message} ${err.error.detail || ""}`;
    }

    return res.status(500).json({
      statusCode: 500,
      status: "internal_server_error",
      message,
    });
  };

export default ServerError;
