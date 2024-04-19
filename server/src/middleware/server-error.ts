import logger from "@cofig/logger";
import { viLang } from "@root/constant";
import { CustomError } from "@utils";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose, { mongo } from "mongoose";
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

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        statusCode: 401,
        status: "token_expired",
        message: "",
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        statusCode: 401,
        status: "invalid_token",
        message: "",
      });
    }

    if (err instanceof mongo.MongoServerError) {
      if (err.code === 11000) {
        const keyPattern = /{\s*([^:]+?):\s*/;
        const match = keyPattern.exec(err.message);
        console.log(match);
        const duplicateKeyField = match ? match[1] : "unknown";
        message = `${viLang[duplicateKeyField]} đã tồn tại`;
      }
      console.log(err.message);
      return res.status(400).json({
        statusCode: 400,
        status: "duplicate_data",
        message,
      });
    }

    if (err instanceof mongoose.Error.CastError) {
      message = "Không tìm thấy";
      return res.status(400).json({
        statusCode: 400,
        status: "not_found",
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
