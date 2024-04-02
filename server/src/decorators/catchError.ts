import { CustomError } from "@utils/errorHandler";
import { Request, Response } from "express";

export function CatchCustomError(target: any, key: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function (...args: [Request, Response]) {
    const req: Request = args[0];
    const res: Response = args[1];
    try {
      return method.apply(this, args);
    } catch (error) {
      if (error instanceof CustomError)
        res.status(error.statusCode).json({ message: error.message })
    }
  }
  return descriptor;
}


export function AsyncCatchCustomError(target: any, key: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = async function (...args: [Request, Response]) {
    const req: Request = args[0];
    const res: Response = args[1];
    try {
      return await method.apply(this, args);
    } catch (error) {
      if (error instanceof CustomError)
        res.status(error.statusCode).json({ message: error.message })
    }
  }
  return descriptor;
}
