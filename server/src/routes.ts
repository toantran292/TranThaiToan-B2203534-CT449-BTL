import { authRoute } from "@auth/auth.route";
import { config } from "@root/config";
import { userRoute } from "@users/user.route";
import { Application } from "express";

const BASE_ENDPOINT = '/api'

const setupRoutes = (app: Application) => {
  const routes = () => {
    if (config.NODE_ENV == 'dev')
      app.use('/dev', (req, res) => {
        return res.status(200).json({ message: "Xin chao" })
      })
    app.use('/auth', authRoute.routes());
    app.use(`${BASE_ENDPOINT}/users`, userRoute.routes())
  }
  routes();
}

export default setupRoutes;
