import { ClassValidateError } from "@utils";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

function validateBody<T = any>(dtoClass: any) {
  return async (req: Request<T>, res: Response, _next: NextFunction) => {
    try {
      const instance = plainToClass(dtoClass, req.body) as T;
      const errors = await validate(instance as object, {
        whitelist: true,
      });

      if (errors.length > 0) {
        throw new ClassValidateError(
          Object.values(errors[0].constraints as any)[0] as string,
        );
      }

      req.body = instance;
      _next();
    } catch (error) {
      _next(error);
    }
  };
}

export default validateBody;
