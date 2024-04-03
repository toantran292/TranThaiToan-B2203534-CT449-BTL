import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

function validateBody<T = any>(dtoClass: any) {
  return async (req: Request<T>, res: Response, _next: NextFunction) => {
    try {
      const instance: T = plainToClass(dtoClass, req.body) as T;
      const errors = await validate(instance as object);

      if (errors.length > 0) {
        const errorMessages = errors.map((error) => Object.values(error.constraints as any)).flat();
        return res.status(400).json({ errors: errorMessages });
      }

      req.body = instance;
      _next();
    } catch (error) {
      _next(error);
    }
  };
}
export default validateBody;
