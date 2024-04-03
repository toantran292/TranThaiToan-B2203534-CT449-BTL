import logger from "@cofig/logger";
import { JoiRequestValidationError } from "@utils";
import Joi from "joi";

export function Validate<T = any>(schema: Joi.ObjectSchema<T>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      const length = args.length;
      const body = args[length - 1];
      // console.log(body)
      try {
        await schema.validateAsync(body);
      } catch (error: any) {
        logger.debug(error);
        throw new JoiRequestValidationError(error.details[0].message);
      }
      return originalMethod.call(this, ...args);
    };
    return target;
  };
}
