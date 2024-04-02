import 'reflect-metadata';
// // import * as http from "http";

// import AuthController from '@auth/auth.controller';
// import { CustomError, IErrorResponse } from '@global/utils/errorHandler';
// import logger from '@global/utils/logger';
// import DevController from '@root/app/dev/DevController';
// import { config } from '@root/config';
// import { defineRoutes } from '@root/modules/routes';
// import compression from 'compression';
// import cors from 'cors';
// import { Express, NextFunction, Request, Response, json, urlencoded } from "express";
// import HTTP_STATUS from 'http-status-codes';

// const PORT = 3000;
// export default class Server {
//   private app: Express;
//   constructor(app: Express) {
//     this.app = app;
//   }

//   public start(): void {
//     this.sercurityMiddleware(this.app);
//     this.standardMiddleware(this.app);
//     this.routesMiddleware(this.app);
//     this.globalErrorHandler(this.app);
//     this.startServer(this.app);
//   }

//   private sercurityMiddleware(app: Express): void {
//     app.use(cors());
//   }

//   private standardMiddleware(app: Express): void {
//     app.use(compression())
//     app.use(json())
//     app.use(urlencoded({ extended: true }));
//   }

//   private routesMiddleware(app: Express): void {
//     defineRoutes([AuthController], app);
//     defineRoutes([DevController], app, '/api');
//   }

//   private globalErrorHandler(app: Express): void {
//     app.all('*', (req: Request, res: Response) => {
//       return res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.method} ${req.originalUrl} not found.` })
//     })
//     app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
//       logger.error("Global Error", error);
//       if (error instanceof CustomError)
//         return res.status(error.statusCode).json(error.serializeErrors())
//       next()
//     })
//   }

//   private async startServer(app: Express): Promise<void> {
//     if (!config.JWT_ACCESS_TOKEN)
//       throw new Error('JWT_ACCESS_TOKEN must be provided.');
//     try {
//       app.listen(PORT, () => {
//         logger.info(`Enviroment: ${config.NODE_ENV}`);
//         logger.info(`Server is running on port: ${PORT}`);
//       })
//     } catch (error) {
//       logger.error(error)
//       process.exit(1);
//     }
//   }
// }

import AuthController from '@auth/auth.controller';
import { mongo, server } from '@cofig/config';
import logger from '@cofig/logger';
import { corsHandler } from '@middleware/corsHandler';
import { loggingHandler } from '@middleware/logginHandler';
import { defineRoutes } from '@modules/routes';
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
  }

  logger.info('----------------------------------------');
  logger.info('Logging & Configuration');
  logger.info('----------------------------------------');
  // application.use(declareHandler);
  application.use(loggingHandler);
  application.use(corsHandler);

  logger.info('----------------------------------------');
  logger.info('Define Controller Routing');
  logger.info('----------------------------------------');
  defineRoutes([AuthController], application);

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
