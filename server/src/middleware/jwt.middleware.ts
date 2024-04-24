import { AuthPayload } from "@auth/interfaces/auth.interface";
import { Forbidden, decodeJwtToken, verifyJwtToken } from "@utils";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export enum TYPE_JWT {
  AUTHEN = "AUTHEN",
  CHECK = "CHECK",
}

function jwtMiddleware(type: TYPE_JWT = TYPE_JWT.AUTHEN) {
  return async (req: Request, res: Response, _next: NextFunction) => {
    let _token: string = "";
    try {
      const { authorization } = req.headers;

      if (!authorization)
        throw new Forbidden("Token is not available. Please login again.");

      const token = authorization.split(" ")[1];
      _token = token;
      const user = verifyJwtToken(token) as AuthPayload;

      req.user = user;

      _next();
    } catch (error) {
      if (type === TYPE_JWT.CHECK && error instanceof jwt.TokenExpiredError) {
        const user = decodeJwtToken(_token) as AuthPayload;
        req._user = user;
        return _next();
      }
      _next(error);
    }
  };
}

export default jwtMiddleware;
