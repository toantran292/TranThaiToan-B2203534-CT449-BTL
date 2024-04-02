import { Controller } from "@global/decoractors/controller";
import { Get } from "@global/decoractors/route";
import { Request, Response } from "express";

@Controller('/dev')
export default class DevController {
  @Get()
  public index(req: Request, res: Response) {
    return res.send('Development');
  }
  @Get('/:name')
  public details(req: Request, res: Response) {
    return res.send(`You are looking at the profile of ${req.params.name}`);
  }
}
