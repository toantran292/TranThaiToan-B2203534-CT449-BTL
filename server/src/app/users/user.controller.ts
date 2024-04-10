import {
  Body,
  Controller,
  Delete,
  Dependencies,
  Get,
  Middlewares,
  Param,
  Patch,
  Post,
} from "@decorators";
import jwtMiddleware from "@middleware/jwt.middleware";
import permissionMiddleware from "@middleware/permission.middleware";
import validateBody from "@middleware/validate";
import { CreateUserDTO, UpdateUserDTO } from "@users/dto";
import UserService from "@users/user.service";

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
  @Middlewares(validateBody(CreateUserDTO))
  create(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Get("/:id")
  getOne(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  @Patch("/:id")
  @Middlewares(validateBody(UpdateUserDTO))
  update(@Body() body: UpdateUserDTO, @Param("id") id: string) {
    return this.userService.updateUserById(body, id);
  }

  @Delete("/:id")
  delete() {
    return { message: "deleted" };
  }
}

export default UserController;
