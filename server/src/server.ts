import 'reflect-metadata';
// =====================
import AuthController from '@auth/auth.controller';
import { mongo, server } from '@cofig/config';
import logger from '@cofig/logger';
import { corsHandler } from '@middleware/corsHandler';
import { declareHandler } from '@middleware/declareHandler';
import { globalErrorHandler, notFoundRoute } from '@middleware/globalErrorHandler';
import { loggingHandler } from '@middleware/logginHandler';
import { defineRoutes } from '@modules/routes';
import UserController from '@users/user.controller';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  logger.info('----------------------------------------');
  logger.info('Initializing API');
  logger.info('----------------------------------------');
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  logger.info('----------------------------------------');
  logger.info('Connect to Mongo');
  logger.info('----------------------------------------');
  try {
    const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
    logger.info('----------------------------------------');
    logger.info('Connected to Mongo: ', connection.version);
    logger.info('----------------------------------------');
  } catch (error) {
    logger.info('----------------------------------------');
    logger.error(error);
    logger.error('Unable to connect to Mongo');
    logger.info('----------------------------------------');
    process.exit(1);
  }

  logger.info('----------------------------------------');
  logger.info('Logging & Configuration');
  logger.info('----------------------------------------');
  application.use(declareHandler);
  application.use(loggingHandler);
  application.use(corsHandler);


  logger.info('----------------------------------------');
  logger.info('Define Controller Routing');
  logger.info('----------------------------------------');
  defineRoutes([AuthController], application);
  defineRoutes([UserController], application, '/api');

  logger.info('----------------------------------------');
  logger.info('Catching Error');
  logger.info('----------------------------------------');
  application.use(notFoundRoute);
  application.use(globalErrorHandler);

  logger.info('----------------------------------------');
  logger.info('Starting Server');
  logger.info('----------------------------------------');
  httpServer = http.createServer(application);
  httpServer.listen(server.SERVER_PORT, () => {
    logger.info('----------------------------------------');
    logger.info(`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
    logger.info('----------------------------------------');
  });
}

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
