import logger from "@cofig/logger";
import { CustomError } from "@utils";
import { NextFunction, Request, Response } from "express";
import multer from "multer";

const ServerError =
  () => (err: any, req: Request, res: Response, _next: NextFunction) => {
    let message = "";
    if (err instanceof CustomError)
      return res.status(err.statusCode).json(err.serializeErrors());
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE")
        message = `${err.field} gửi tối đa chỉ được một file ảnh`;
      console.log(err.code);
      return res.status(400).json({
        statusCode: 400,
        status: "limit_exceed",
        message,
      });
    }

    logger.debug("ServerError");

    if (Array.isArray(err.error)) {
      message = err.error.map((e: any) => `${e.param}: ${e.msg}`).toString();
    } else {
      message = !err.error
        ? err.message
        : `${err.error.message} ${err.error.detail || ""}`;
    }

    console.log(err);

    return res.status(500).json({
      statusCode: 500,
      status: "internal_server_error",
      message,
    });
  };

export default ServerError;
