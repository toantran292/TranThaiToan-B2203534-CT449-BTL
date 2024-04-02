import logger from "@cofig/logger";
import { RouteHanlder } from "@root/library/routes";
import { Express, NextFunction, Request, RequestHandler, Response } from "express";
import HTTP_STATUS from "http-status-codes";

function RouteHandler(statusCode: number, target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await originalMethod.call(this, req, res, next);
      if (result !== undefined) {
        res.status(statusCode).json(result)
      }
    } catch (error) {
      logger.debug("Catch Error")
      next(error);
    }
  }
}

export function Route(statusCode: number, method: keyof Express, path: string = '', ...middleware: RequestHandler[]) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const routePath = path;
    const routeHandlers: RouteHanlder = Reflect.getMetadata('routeHandlers', target) || new Map();

    RouteHandler(statusCode, target, propertyKey, descriptor);

    if (!routeHandlers.has(method)) {
      routeHandlers.set(method, new Map())
    }

    routeHandlers.get(method)?.set(routePath, [...middleware, descriptor.value]);
    Reflect.defineMetadata('routeHandlers', routeHandlers, target)
  }
}

export function Get(path: string = '', ...middleware: RequestHandler[]) {
  return Route(HTTP_STATUS.OK, 'get', path, ...middleware);
}
export function Post(path: string = '', ...middleware: RequestHandler[]) {
  return Route(HTTP_STATUS.CREATED, 'post', path, ...middleware);
}
export function Put(path: string = '', ...middleware: RequestHandler[]) {
  return Route(HTTP_STATUS.CREATED, 'put', path, ...middleware);
}
export function Patch(path: string = '', ...middleware: RequestHandler[]) {
  return Route(HTTP_STATUS.CREATED, 'patch', path, ...middleware);
}
export function Delete(path: string = '', ...middleware: RequestHandler[]) {
  return Route(HTTP_STATUS.OK, 'delete', path, ...middleware);
}
