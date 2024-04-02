import { RouteHanlder } from "@root/library/routes";
import { Express, RequestHandler } from "express";
export function Route(method: keyof Express, path: string = '', ...middleware: RequestHandler[]) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const routePath = path;
    const routeHandlers: RouteHanlder = Reflect.getMetadata('routeHandlers', target) || new Map();

    if (!routeHandlers.has(method)) {
      routeHandlers.set(method, new Map())
    }

    routeHandlers.get(method)?.set(routePath, [...middleware, descriptor.value]);
    Reflect.defineMetadata('routeHandlers', routeHandlers, target)
  }
}

export function Get(path: string = '', ...middleware: RequestHandler[]) {
  return Route('get', path, ...middleware);
}
export function Post(path: string = '', ...middleware: RequestHandler[]) {
  return Route('post', path, ...middleware);
}
export function Put(path: string = '', ...middleware: RequestHandler[]) {
  return Route('put', path, ...middleware);
}
export function Patch(path: string = '', ...middleware: RequestHandler[]) {
  return Route('patch', path, ...middleware);
}
export function Delete(path: string = '', ...middleware: RequestHandler[]) {
  return Route('delete', path, ...middleware);
}
