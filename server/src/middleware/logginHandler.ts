import logger from '@cofig/logger';
import { NextFunction, Request, Response } from 'express';

export function loggingHandler(req: Request, res: Response, next: NextFunction) {
  logger.http(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logger.http(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
  });

  next();
}
