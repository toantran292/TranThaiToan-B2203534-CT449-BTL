import {
  CONTROLLER_MIDDLEWARES,
  CONTROLLER_PREFIX,
  DEPENDENCIES,
  HEADER,
  HOOKS,
  INJECTABLE,
  INTERCEPTOR,
  MIDDLEWARES,
  MODULE,
  MULTER_OPTIONS,
  STATUS_CODE,
  URL_REDIRECT,
} from "@root/constants";
import {
  MulterStrategy,
  ParameterType,
  mappingMetadataDecorator,
  mappingMiddlewares,
  mappingModuleDecorator,
  mappingParamDecorator,
} from "@utils";
import express from "express";
import { compact } from "lodash";

export function Body<T>(property?: keyof T) {
  return mappingParamDecorator({ type: ParameterType.BODY, property });
}
export function Query<T>(property?: keyof T) {
  return mappingParamDecorator({ type: ParameterType.QUERY, property });
}
export function Param<T>(property?: keyof T) {
  return mappingParamDecorator({ type: ParameterType.PARAM, property });
}

export const Request = () => mappingParamDecorator({ type: ParameterType.REQUEST });
export const Response = () => mappingParamDecorator({ type: ParameterType.RESPONSE });
export const Req = Request;
export const Res = Response;

export const Get = (path = "/") => mappingMetadataDecorator({ method: "GET", path });

export const Post = (path = "/") => mappingMetadataDecorator({ method: "POST", path });

export const Put = (path = "/") => mappingMetadataDecorator({ method: "PUT", path });

export const Delete = (path = "/") => mappingMetadataDecorator({ method: "DELETE", path });

export const Patch = (path = "/") => mappingMetadataDecorator({ method: "PATCH", path });

export const All = (path = "/") => mappingMetadataDecorator({ method: "ALL", path });

export const Options = (path = "/") => mappingMetadataDecorator({ method: "OPTIONS", path });

export const Head = (path = "/") => mappingMetadataDecorator({ method: "HEAD", path });

export const Redirect =
  (url: string, statusCode = 301): MethodDecorator =>
  (target: any, propertyKey, descriptor) => {
    if (!url) {
      throw new Error("url cannot be empty.");
    }

    Reflect.defineMetadata(URL_REDIRECT, url, target[propertyKey]);

    return StatusCode(statusCode)(target, propertyKey, descriptor);
  };

export const StatusCode =
  (statusCode = 200): MethodDecorator =>
  (target: any, propertyKey, descriptor) => {
    if (!statusCode) {
      throw new Error("statusCode cannot be empty.");
    }

    const redirectStatusCode = Reflect.getMetadata(STATUS_CODE, target[propertyKey]);

    Reflect.defineMetadata(STATUS_CODE, redirectStatusCode ? redirectStatusCode : statusCode, target[propertyKey]);

    return descriptor;
  };

export const Header =
  (header: any): MethodDecorator =>
  (target: any, propertyKey, descriptor) => {
    if (!header) {
      throw new Error("header cannot be empty.");
    }

    Reflect.defineMetadata(HEADER, header, target[propertyKey]);

    return descriptor;
  };

export const Controller =
  (prefix = "/", ...middleware: any): ClassDecorator =>
  (target) => {
    if (!prefix) {
      throw new Error("prefix cannot be empty.");
    }
    const path = compact(prefix.split("/")).join("/");

    Reflect.defineMetadata(CONTROLLER_PREFIX, `/${path}`, target);

    const middlewares = mappingMiddlewares(middleware);

    Reflect.defineMetadata(CONTROLLER_MIDDLEWARES, middlewares, target);
  };

export interface IModuleOptions {
  controllers: any[];
  imports?: any[];
}

export const Module = (options: IModuleOptions = { controllers: [], imports: [] }) => {
  const { controllers = [], imports = [] } = options;

  const extraModules: any[] = [];

  imports.forEach((importer: any) => {
    const modules = Reflect.getMetadata(MODULE, importer.prototype) || [];

    modules.forEach((m: any) => {
      extraModules.push(m);
    });
  });

  return mappingModuleDecorator(controllers, extraModules);
};

export const Hooks =
  (...func: any): ClassDecorator =>
  (target) => {
    Reflect.defineMetadata(HOOKS, func, target.prototype);
  };

export const Interceptors =
  (...interceptor: ((req: express.Request, data: any) => any)[]): MethodDecorator =>
  (target: any, propertyKey, descriptor) => {
    if (!propertyKey) {
      throw new Error("@Interceptor is not a part of class decorator.");
    }

    Reflect.defineMetadata(INTERCEPTOR, interceptor, target[propertyKey]);

    return descriptor;
  };

export const Multer =
  (...option: any): MethodDecorator =>
  (target: any, propertyKey, descriptor) => {
    if (!propertyKey) {
      throw new Error("@Multer is not a part of class decorator.");
    }

    const options = option.map((opt: any) => {
      if (!opt || Object.keys(opt).length === 0) return null;

      const { name, maxCount = 1, strategy = MulterStrategy.OBJECT } = opt;

      if (!name) {
        throw new Error("name cannot be empty.");
      }

      if (typeof maxCount !== "number" || maxCount < 1) {
        throw new Error("type of maxCount must be number and greater than 1.");
      }

      if (!Object.keys(MulterStrategy).some((str) => strategy.includes(str))) {
        throw new Error(
          `the strategy should be '${MulterStrategy.SINGLE}', '${MulterStrategy.ARRAY}' or '${MulterStrategy.OBJECT}'`,
        );
      }

      return { name, maxCount, strategy };
    });

    Reflect.defineMetadata(MULTER_OPTIONS, compact(options), target[propertyKey]);

    return descriptor;
  };

export const UploadFile =
  (name: string): MethodDecorator =>
  (target, propertyKey, descriptor) => {
    return Multer({
      name,
      maxCount: 1,
      strategy: "SINGLE",
    })(target, propertyKey, descriptor);
  };

export const UploadFiles =
  (name: string, maxCount = 1): MethodDecorator =>
  (target, propertyKey, descriptor) => {
    return Multer({
      name,
      maxCount,
      strategy: "ARRAY",
    })(target, propertyKey, descriptor);
  };

export const Middlewares =
  (...middleware: any): MethodDecorator =>
  (target: any, propertyKey, descriptor) => {
    if (!propertyKey) {
      throw new Error("@Middlewares is not a part of class decorator.");
    }

    const middlewares = mappingMiddlewares(middleware);

    Reflect.defineMetadata(MIDDLEWARES, middlewares, target[propertyKey]);

    return descriptor;
  };
export const Injectable = (): ClassDecorator => (target: any) => {
  let instance: any;

  const constructor = function (this: any, ...args: any[]) {
    if (!instance) {
      instance = new target(...args);
    }
    return instance;
  };
  constructor.prototype = Object.create(target.prototype);

  Reflect.defineMetadata(INJECTABLE, constructor.prototype, target);
  return constructor as any;
};

export const Dependencies =
  (...dependency: any): ClassDecorator =>
  (target) => {
    const dependencies = dependency.map((d: any) => {
      const dep = Reflect.getMetadata(INJECTABLE, d);

      if (!dep) {
        throw new Error(
          `Can't resolve dependencies of the ${target.name}. Please make sure your dependencies are injected by Injectable decorator.`,
        );
      }

      return d;
    });

    Reflect.defineMetadata(DEPENDENCIES, dependencies, target);
  };
