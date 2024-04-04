import { Controller, Delete, Get, Patch, Post, User } from "@decorators";
import jwtMiddleware from "@middleware/jwt.middleware";
import permissionMiddleware from "@middleware/permission.middleware";

@Controller("/api/users", jwtMiddleware(), permissionMiddleware())
class UserController {
  constructor() {}
  @Get()
  getAll(@User() user) {
    console.log(user);
    return { user, url: process.env.MONGO_CONNECTION };
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

  @Delete("/:id")
  delete() {
    return { message: "deleted" };
  }
}

export default UserController;
