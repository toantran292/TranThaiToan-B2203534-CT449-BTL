import { CustomError } from "@global/utils/errorHandler";
import logger from "@global/utils/logger";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function Validate<T = any>(schema: Joi.ObjectSchema<T>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        await schema.validateAsync(req.body);
      } catch (error) {
        logger.error(error)

        if (error instanceof CustomError)
          return res.status(error.statusCode).json({ message: error.message })
      }
      return originalMethod.call(this, req, res, next);
    }

  }
}
