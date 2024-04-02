import { Controller } from "@decorators/controller";
import { Delete, Get, Patch, Post } from "@decorators/route";
import { Request, Response } from "express";

@Controller('/users')
class UserController {

  @Get()
  // @MongoGetAll(UserModel)
  getAll(req: Request, res: Response) {
    return {
      choDat: 'khung',
      Tri: 'dien',
    }

  }

  @Post('')
  create(req: Request, res: Response) {
    return 'asdhasjkdhaskjd'
  }

  @Get('/:id')
  // @MongoGet(UserModel)
  getOne(req: Request, res: Response) {
    return 'asdhasjkdhaskjd'
  }

  @Patch('/:id')
  update(req: Request, res: Response) {
    return 'asdhasjkdhaskjd'
  }

  @Delete('/:id')
  delete(req: Request, res: Response) {
    return { message: 'deleted' };
  }

}


export default UserController;
