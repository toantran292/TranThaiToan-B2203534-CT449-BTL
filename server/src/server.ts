import "reflect-metadata";
// // =====================
import { mongo } from "@cofig/config";
import logger from "@cofig/logger";
import { loggingHandler } from "@middleware/logginHandler";
import NotFoundError from "@middleware/not-found-error";
import ServerError from "@middleware/server-error";
import AppModule from "@root/app.module";
import Factory from "@root/library/factory";
import cors from "cors";
import { json, urlencoded } from "express";
import mongoose from "mongoose";

const port = 3000;
export const bootstrap = async () => {
  try {
    const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
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

  const instance = await Factory.applyMiddlewares(
    cors(),
    json(),
    urlencoded({ extended: true }),
    loggingHandler(),
  ).create(AppModule);
  const { server } = instance.applyMiddlewares(NotFoundError(), ServerError());
  server.listen(port);
  logger.info(`Server is serving on port ${port}...`);
  logger.info("----------------------------------------");
};

bootstrap();
