import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      mongoGet: Document | undefined,
      mongoGetAll: Document[];
      mongoCreate: Document | undefined,
      mongoUpdate: Document | undefined,
      // mongoDelete: Document | undefined,
      // mongoGet: Document | undefined,

    }
  }
}

export function declareHandler(req: Request, res: Response, next: NextFunction) {
  req.mongoCreate = undefined;
  req.mongoGet = undefined;
  req.mongoUpdate = undefined;
  req.mongoGetAll = [];
  next();
}
