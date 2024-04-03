import { Forbidden } from "@utils";
import { NextFunction, Request, Response } from "express";

function permissionMiddleware() {
  return async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { user } = req;

      if (!user) throw new Forbidden("Login again!");

      if (!user.isStaff) throw new Forbidden("You not have permission to do this action!");

      _next();
    } catch (error) {
      _next(error);
    }
  };
}

export default permissionMiddleware;
