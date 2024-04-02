import { Controller } from "@global/decoractors/controller";
import { Route } from "@global/decoractors/route";
import { Request, Response } from "express";

@Controller('/dev')
export default class DevController {
  @Route('get')
  public index(req: Request, res: Response) {
    return res.send('Development');
  }
  @Route('get', '/:name')
  public details(req: Request, res: Response) {
    return res.send(`You are looking at the profile of ${req.params.name}`);
  }
}
