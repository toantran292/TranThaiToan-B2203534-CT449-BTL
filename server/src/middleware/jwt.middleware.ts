import { AuthPayload } from "@auth/interfaces/auth.interface";
import { jwtConfig } from "@cofig/config";
import { Forbidden } from "@utils";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function jwtMiddleware() {
  return async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw new Forbidden("Token is not available. Please login again.");

      const token = authorization.split(" ")[1];
      const user = jwt.verify(token, jwtConfig.JWT_ACCESS_TOKEN) as AuthPayload;

      req.user = user;

      _next();
    } catch (error) {
      _next(error);
    }
  };
}

export default jwtMiddleware;
