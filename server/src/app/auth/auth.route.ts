import { authController } from "@auth/auth.controller";
import { BaseRoute } from "@global/common/BaseClass";
import { Router } from "express";

class AuthRoute extends BaseRoute {
  constructor() {
    super()
  }

  public routes(): Router {
    this.router.post("/register", authController.register);
    this.router.post("/login", authController.login);

    return this.router;
  }
}

export const authRoute: AuthRoute = new AuthRoute();
