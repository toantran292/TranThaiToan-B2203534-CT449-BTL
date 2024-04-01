import { Router } from "express";

export interface IBaseRoute {
  routes(): Router
}

export class BaseRoute implements IBaseRoute {
  protected router: Router;
  constructor() {
    this.router = Router()
  }
  routes(): Router {
    throw new Error("Method not implemented.");
  }
}
