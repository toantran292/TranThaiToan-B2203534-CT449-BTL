import {
  CONTROLLER_MIDDLEWARES,
  CONTROLLER_PREFIX,
  DEPENDENCIES,
  HEADER,
  INTERCEPTOR,
  MIDDLEWARES,
  MODULE,
  MULTER_OPTIONS,
  PARAMTYPES_METADATA,
  REQUEST_METHOD,
  REQUEST_PATH,
  STATUS_CODE,
  URL_REDIRECT,
} from "@root/constants";
import { NextFunction, Request, Response } from "express";
import { compact, isEmpty, isEqual } from "lodash";

export const MulterStrategy = Object.freeze({
  SINGLE: "SINGLE",
  ARRAY: "ARRAY",
  OBJECT: "OBJECT",
});

export enum ParameterType {
  BODY = "body",
  QUERY = "query",
  PARAM = "params",
  REQUEST = "request",
  RESPONSE = "response",
  NEXT = "next",
}

interface IParam {
  type: any;
  property: string;
  parameterIndex: number;
}

export const last = (array: any[]) => {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
};
export const mappingMetadataDecorator =
  ({ method = "GET", path = "/" }): MethodDecorator =>
  (target: any, propertyKey, descriptor: PropertyDescriptor) => {
    if (!path) {
      throw new Error("Path cannot be empty.");
    }
    Reflect.defineMetadata(REQUEST_METHOD, method, target[propertyKey]);

    Reflect.defineMetadata(REQUEST_PATH, path, target[propertyKey]);

    return descriptor;
  };

export function mappingParamDecorator<T>({
  type = ParameterType.BODY,
  property = undefined,
}: {
  type: ParameterType;
  property?: keyof T;
}): ParameterDecorator {
  return (target: any, propertyKey, parameterIndex) => {
    const args = Reflect.getMetadata(PARAMTYPES_METADATA, target[propertyKey!]) || [];
    Reflect.defineMetadata(PARAMTYPES_METADATA, [...args, { type, property, parameterIndex }], target[propertyKey!]);
  };
}

// export const mappingParamDecorator =
//   ({ type = ParameterType.BODY, property = "" }: { type: ParameterType; property?: string }): ParameterDecorator =>

export const mappingMiddlewares = (middlewares: any[] = []) =>
  compact(
    middlewares.map((mid) => {
      return typeof mid === "function" && mid;
    }),
  );

export const mappingModuleDecorator =
  (controllers: any[] = [], extraModules: any[] = []): ClassDecorator =>
  (target) => {
    const modules = [...extraModules];

    controllers.forEach((controller) => {
      if (!controller) {
        throw new Error("Controller cannot be null.");
      }

      const prefix = Reflect.getMetadata(CONTROLLER_PREFIX, controller) || "/";
      // console.log(`${prefix}`);
      const controllerMiddlewares = Reflect.getMetadata(CONTROLLER_MIDDLEWARES, controller) || [];

      const dependencies = Reflect.getMetadata(DEPENDENCIES, controller) || [];

      const dependenciesMapped = dependencies.map((dependency: any) => new dependency());

      const self = controller.prototype;

      const instance = new self.constructor(...dependenciesMapped);
      // console.log(self);

      Object.getOwnPropertyNames(self)
        .filter((it) => it !== "constructor" && typeof self[it] === "function")
        .forEach((func) => {
          const controllerTarget = instance[func];

          const method = Reflect.getMetadata(REQUEST_METHOD, controllerTarget);

          const path = Reflect.getMetadata(REQUEST_PATH, controllerTarget);

          const multerOptions = Reflect.getMetadata(MULTER_OPTIONS, controllerTarget) || [];

          const middlewares = Reflect.getMetadata(MIDDLEWARES, controllerTarget) || [];
          // console.log(prefix, path, controllerTarget);
          if (method && path) {
            const realPath = compact(path.split("/")).join("/");

            const urlRedirect = Reflect.getMetadata(URL_REDIRECT, controllerTarget);

            const header = Reflect.getMetadata(HEADER, controllerTarget);

            const status = Reflect.getMetadata(STATUS_CODE, controllerTarget) || 200;

            const interceptors = Reflect.getMetadata(INTERCEPTOR, controllerTarget);

            const params: IParam[] = Reflect.getMetadata(PARAMTYPES_METADATA, controllerTarget) || [];
            const resolver = (req: Request, res: Response, next: NextFunction) => {
              const args: any[] = [];
              params
                .sort((a, b) => a.parameterIndex - b.parameterIndex)
                .forEach((param) => {
                  if (param.type === ParameterType.REQUEST) args.push(req);
                  else if (param.type === ParameterType.RESPONSE) args.push(res);
                  else if (param.type === ParameterType.NEXT) args.push(next);
                  else {
                    let type = req[param.type];
                    if (!isEmpty(param.property)) type = type[param.property];
                    args.push(type);
                  }
                });
              return Promise.resolve(controllerTarget.bind(instance)(...args))
                .then((result) => {
                  if (isEqual(result, res)) {
                    return result;
                  }

                  const handleMappingResolver = (result: any) => {
                    if (header) {
                      res.set(header);
                    }

                    if (urlRedirect) return res.redirect(status, urlRedirect);

                    return res.status(status).json(result);
                  };

                  if (interceptors && interceptors.length !== 0) {
                    return Promise.all(
                      interceptors.map((interceptor: any) => {
                        if (interceptor && typeof interceptor === "function") {
                          return Promise.resolve(interceptor(req, result));
                        }
                        return Promise.resolve(null);
                      }),
                    )
                      .then((nestedResults) => {
                        return handleMappingResolver(last(nestedResults) || result);
                      })
                      .catch((error) => {
                        throw error;
                      });
                  }

                  return handleMappingResolver(result);
                })
                .catch((err: any) => {
                  next(err);
                });
            };
            modules.push({
              path: `/${compact(`${prefix}/${realPath}`.split("/")).join("/")}`,
              method,
              multerOptions,
              middlewares: [...controllerMiddlewares, ...middlewares],
              resolver,
            });
          }
        });
    });

    Reflect.defineMetadata(MODULE, modules, target.prototype);
  };
