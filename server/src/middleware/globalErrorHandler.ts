import logger from '@cofig/logger';
import { CustomError, IErrorResponse } from '@utils/errorHandler';
import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from "http-status-codes";

export function globalErrorHandler(error: IErrorResponse, req: Request, res: Response, next: NextFunction) {
  logger.error("Global Error", error);
  if (error instanceof CustomError)
    return res.status(error.statusCode).json(error.serializeErrors())

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something broke!' });
}


export function notFoundRoute(req: Request, res: Response) {
  return res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found.` })
}
