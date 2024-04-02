import logger from "@cofig/logger";
import { NextFunction, Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { Model } from "mongoose";


export function MongoGetAll(model: Model<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;


    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const documents = await model.find();
        req.mongoGetAll = documents;
      } catch (error) {
        logger.debug(error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
      }

      return originalMethod.call(this, req, res, next);
    }

    return descriptor
  }
}
