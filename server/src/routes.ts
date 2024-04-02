import DevController from "@root/app/dev/DevController";
import { defineRoutes } from "@root/modules/routes";
import { Express } from "express";
const BASE_ENDPOINT = '/api'

const setupRoutes = (app: Express) => {
  const routes = () => {
    // if (config.NODE_ENV == 'dev')
    //   app.use('/dev', (req, res) => {
    //     return res.status(200).json({ message: "Xin chao" })
    //   })
    // app.use('/auth', authRoute.routes());
    // app.use(`${BASE_ENDPOINT}/users`, userRoute.routes())
    defineRoutes([DevController], app);
  }
  routes();
}

export default setupRoutes;
