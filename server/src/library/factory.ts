import logger from "@cofig/logger";
import { HOOKS, MODULE } from "@root/constants";
import { last } from "@utils";
import express, { ErrorRequestHandler, Express, RequestHandler } from "express";

import http from "http";
import { compact } from "lodash";
import multer from "multer";

export interface IFactoryOptions {
  debug: boolean;
  multer: multer.Options;
}

export interface IFactoryHandler {
  url?: string | RegExp;
  handler: RequestHandler;
}

export interface Module {
  path: string;
  method: string;
  multerOptions: multer.Options[];
  middlewares: any[];
  resolver: any;
}

class Factory {
  static app = express();

  static server: http.Server;

  static #upload: multer.Multer;

  static async create(moduleCls: any, options?: boolean | IFactoryOptions) {
    if (!module) {
      throw new Error(`Module is required in Factory. You're missing module.`);
    }

    const modules: Module[] = Reflect.getMetadata(MODULE, moduleCls.prototype) || [];
    // console.log(modules);
    const hooks = Reflect.getMetadata(HOOKS, moduleCls.prototype);

    const haveHooks = Array.isArray(hooks) && compact(hooks).length !== 0;

    if ((typeof options === "boolean" && options) || (options && options.debug)) {
      logger.info("Modules are mapped.");

      console.log(modules);

      if (haveHooks) {
        logger.info(`List of hook.`);

        console.log(
          compact(
            hooks.map((hook) => {
              return hook && typeof hook === "function" && hook.prototype;
            }),
          ),
        );
      }
    }

    if (haveHooks) {
      const listHook = await Promise.all(
        hooks.map((hook) => {
          if (hook && typeof hook === "function") {
            return Promise.resolve(hook());
          }
          return Promise.resolve(null);
        }),
      );

      listHook.forEach((resultReturnedFromHook) => {
        if (resultReturnedFromHook) {
          const { request } = this.app;

          Object.assign(request, resultReturnedFromHook);
        }
      });
    }

    if (typeof options === "object" && options.multer) {
      this.#upload = multer(options.multer);
    }

    modules.forEach((module) => {
      const { path, method, multerOptions, middlewares, resolver } = module;

      if (!this.#upload && multerOptions.length !== 0) {
        throw new Error(
          `
            Maybe you're using @Multer, @UploadFile or @UploadFiles decorator but you're missing define multer options.
            Please see: https://github.com/expressjs/multer#multeropts
          `.trim(),
        );
      } else if (this.#upload && multerOptions.length !== 0) {
        if (multerOptions.length > 1) {
          const opts: multer.Field[] = multerOptions.map((name, maxCount) => ({ name, maxCount } as multer.Field));

          this.app[method.toLowerCase() as keyof Express](path, this.#upload.fields(opts), [...middlewares, resolver]);
        } else {
          const { name, maxCount, strategy } = last(multerOptions) || {};

          switch (strategy) {
            case "SINGLE": {
              this.app[method.toLowerCase() as keyof Express](path, this.#upload.single(name), [
                ...middlewares,
                resolver,
              ]);

              break;
            }
            case "ARRAY": {
              this.app[method.toLowerCase() as keyof Express](path, this.#upload.array(name, maxCount), [
                ...middlewares,
                resolver,
              ]);

              break;
            }
            default: {
              this.app[method.toLowerCase() as keyof Express](path, this.#upload.fields([{ name, maxCount }]), [
                ...middlewares,
                resolver,
              ]);

              break;
            }
          }
        }
      } else {
        this.app[method.toLowerCase() as keyof Express](path, [...middlewares, resolver]);
      }
    });

    if (!this.server) {
      this.server = new http.Server(this.app);
    }

    return this;
  }

  static applyMiddlewares(...handlers: (RequestHandler | IFactoryHandler | ErrorRequestHandler | undefined)[]) {
    handlers.forEach((handler) => {
      if (
        (typeof handler !== "function" && typeof handler !== "object") ||
        (typeof handler === "object" && typeof handler?.handler !== "function")
      ) {
        throw new Error(
          `
            A middleware should be a Express's RequestHandler or object like:
            {
              url?: string | RegExp,
              handler: RequestHandler
            }
          `.trim(),
        );
      }

      if (typeof handler === "object" && handler.handler) {
        if (handler.url) {
          return this.app.use(handler.url, handler.handler);
        }

        return this.app.use(handler.handler);
      }

      return this.app.use(handler as RequestHandler);
    });

    return this;
  }
}

export default Factory;
