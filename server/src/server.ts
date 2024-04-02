import 'reflect-metadata';
// import * as http from "http";

import AuthController from '@auth/auth.controller';
import { CustomError, IErrorResponse } from '@global/utils/errorHandler';
import logger from '@global/utils/logger';
import DevController from '@root/app/dev/DevController';
import { config } from '@root/config';
import { defineRoutes } from '@root/modules/routes';
import compression from 'compression';
import cors from 'cors';
import { Express, NextFunction, Request, Response, json, urlencoded } from "express";
import HTTP_STATUS from 'http-status-codes';

const PORT = 3000;
export default class Server {
  private app: Express;
  constructor(app: Express) {
    this.app = app;
  }

  public start(): void {
    this.sercurityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private sercurityMiddleware(app: Express): void {
    app.use(cors());
  }

  private standardMiddleware(app: Express): void {
    app.use(compression())
    app.use(json())
    app.use(urlencoded({ extended: true }));
  }

  private routesMiddleware(app: Express): void {
    defineRoutes([AuthController], app);
    defineRoutes([DevController], app, '/api');
  }

  private globalErrorHandler(app: Express): void {
    app.all('*', (req: Request, res: Response) => {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.method} ${req.originalUrl} not found.` })
    })
    app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      logger.error("Global Error", error);
      if (error instanceof CustomError)
        return res.status(error.statusCode).json(error.serializeErrors())
      next()
    })
  }

  private async startServer(app: Express): Promise<void> {
    if (!config.JWT_ACCESS_TOKEN)
      throw new Error('JWT_ACCESS_TOKEN must be provided.');
    try {
      app.listen(PORT, () => {
        logger.info(`Enviroment: ${config.NODE_ENV}`);
        logger.info(`Server is running on port: ${PORT}`);
      })
    } catch (error) {
      logger.error(error)
      process.exit(1);
    }
  }
}
