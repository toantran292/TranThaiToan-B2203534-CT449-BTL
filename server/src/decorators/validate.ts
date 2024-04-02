import logger from "@cofig/logger";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function Validate<T = any>(schema: Joi.ObjectSchema<T>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        await schema.validateAsync(req.body);
      } catch (error: any) {
        logger.debug(error)
        return res.status(400).json({ message: error.details[0].message })
      }
      return originalMethod.call(this, req, res, next);
    }

  }
}
