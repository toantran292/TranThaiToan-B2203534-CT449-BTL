import { Router } from "express";

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.post("/register", () => {});
    this.router.post("/login", () => {});

    return this.router;
  }
}

export const authRouters: AuthRoutes = new AuthRoutes();
