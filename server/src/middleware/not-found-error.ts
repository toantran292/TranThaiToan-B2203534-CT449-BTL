import { NextFunction, Request, Response } from "express";

const NotFoundError =
  () =>
  ({ method, path }: Request, res: Response, _next: NextFunction) => {
    return res.status(404).json({ code: 404, message: `Cannot ${method} ${path}` });
  };

export default NotFoundError;
