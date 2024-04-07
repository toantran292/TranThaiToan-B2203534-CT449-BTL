import {
  Controller,
  Delete,
  Dependencies,
  Get,
  Patch,
  Post,
  Req,
  UploadFile,
} from "@decorators";
import jwtMiddleware from "@middleware/jwt.middleware";
import permissionMiddleware from "@middleware/permission.middleware";
import UserService from "@users/user.service";
import { Request } from "express";

@Dependencies(UserService)
@Controller("/api/users", jwtMiddleware(), permissionMiddleware())
class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getAll() {
    const ans = await this.userService.getAllUser();
    const result: any[] = [];
    for (let i = 1; i <= 500; i++) result.push(ans[0]);
    return ans;
  }

  @Post()
  create() {
    return {};
  }

  @Get("/:id")
  getOne(): string {
    return "id";
  }

  @Patch("/:id")
  update() {
    return "asdhasjkdhaskjd";
  }

  @Post("/:id/upload")
  @UploadFile("avatar")
  uploadAvatar(@Req() req: Request) {
    console.log(req.file);

    return { avatar: req.file };
  }

  @Delete("/:id")
  delete() {
    return { message: "deleted" };
  }
}

export default UserController;
