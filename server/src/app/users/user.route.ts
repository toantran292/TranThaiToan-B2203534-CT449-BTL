import { BaseRoute } from "@global/common/BaseClass";
import { Router } from "express";

class UserRoute extends BaseRoute {
  constructor() {
    super()
  }
  routes(): Router {
    this.router.get('', (req, res) => {
      return res.json({ "ho": "Xin chao" })
    })

    return this.router
  }
}
export const userRoute: UserRoute = new UserRoute();
