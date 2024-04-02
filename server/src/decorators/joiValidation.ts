import { JoiRequestValidationError } from "@utils/errorHandler";
import { Request, Response } from "express";
import { ObjectSchema } from "joi";

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void

export function JoiValidation(schema: ObjectSchema): IJoiDecorator {
  return (target, key, descriptor) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: [Request, Response]) {
      const req: Request = args[0]
      const res: Response = args[1]
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) throw new JoiRequestValidationError(error.details[0].message);
      return await method.apply(this, args);
    }
    return descriptor;
  }
}
