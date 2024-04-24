import "reflect-metadata";
// // =====================
import { mongo } from "@cofig/config";
import logger from "@cofig/logger";
import { loggingHandler } from "@middleware/logginHandler";
import NotFoundError from "@middleware/not-found-error";
import ServerError from "@middleware/server-error";
import AppModule from "@root/app.module";
import Factory from "@root/library/factory";
import { ImageFileError, getDirectory, getExtension } from "@utils";
import cors from "cors";
import { json, urlencoded } from "express";

import crypto from "crypto";
import mongoose from "mongoose";
import multer from "multer";
import path, { resolve } from "path";

const port = 3000;
export const bootstrap = async () => {
  try {
    const connection = await mongoose.connect(
      mongo.MONGO_CONNECTION,
      mongo.MONGO_OPTIONS,
    );
    logger.info("----------------------------------------");
    logger.info("Connected to Mongo: ", connection.version);
    logger.info("----------------------------------------");
  } catch (error) {
    logger.info("----------------------------------------");
    logger.error(error);
    logger.error("Unable to connect to Mongo");
    logger.info("----------------------------------------");
    process.exit(1);
  }

  const uploadDirectory = getDirectory("uploads");

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadFolder = getDirectory(
        path.join(uploadDirectory, file.fieldname),
      );
      cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
      // console.log(file);
      const filename = `${crypto
        .randomBytes(20)
        .toString("hex")}.${getExtension(file.originalname)}`;
      cb(null, filename);
    },
  });

  const instance = await Factory.applyMiddlewares(
    cors({ origin: "*" }),
    json(),
    urlencoded({ extended: true }),
    loggingHandler(),
  )
    .serveStaticDir(resolve(process.cwd(), "uploads"))
    .create(AppModule, {
      multer: {
        storage,
        fileFilter: (req, file, cb) => {
          if (file.mimetype.startsWith("image/")) {
            cb(null, true); // Accept the file
          } else {
            cb(
              new ImageFileError("Chỉ cho phép tải lên file hình ảnh") as any,
              false,
            ); // Reject the file
          }
        },
      },
    });

  const { server } = instance.applyMiddlewares(NotFoundError(), ServerError());
  server.listen(port);
  logger.info(`Server is serving on port ${port}...`);
  logger.info("----------------------------------------");
};

bootstrap();
