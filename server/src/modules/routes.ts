import logger from "@global/utils/logger";
import { RouteHanlder } from "@root/library/routes";
import { Express } from "express";

export function defineRoutes(controllers: any, application: Express, baseUrl: string = '') {
  controllers?.forEach((controller: any) => {
    const instance = new controller();
    const routeHandlers: RouteHanlder = Reflect.getMetadata('routeHandlers', instance)
    const controllerPath = Reflect.getMetadata('prefix', instance.constructor)
    if (routeHandlers) {
      const methods = Array.from(routeHandlers.keys());

      methods?.forEach(method => {
        const routes = routeHandlers.get(method);

        if (routes) {
          const routeNames = Array.from(routes.keys());

          routeNames?.forEach(routeName => {
            const handlers = routes.get(routeName);

            if (handlers) {
              application[method](baseUrl + controllerPath + routeName, handlers);
              logger.info(`Loading route: ${method as string} ${baseUrl + controllerPath + routeName}`)
            }
          })
        }
      })
    }
  }
  )
}
