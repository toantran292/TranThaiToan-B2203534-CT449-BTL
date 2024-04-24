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
  Query,
  User,
} from "@decorators";
import jwtMiddleware from "@middleware/jwt.middleware";
import permissionMiddleware from "@middleware/permission.middleware";
import validateBody from "@middleware/validate";
import { CreateUserDTO, UpdateUserDTO } from "@users/dto";
import UserService from "@users/user.service";

@Dependencies(UserService)
@Controller("/api/users", jwtMiddleware())
class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @Middlewares(permissionMiddleware())
  getAll(@Query() query) {
    return this.userService.getAllUser(query);
  }

  @Post()
  @Middlewares(permissionMiddleware(), validateBody(CreateUserDTO))
  create(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Get("/:id")
  getOne(@Param("id") id: string, @User() user) {
    return this.userService.getUserById(id, user);
  }

  @Patch("/:id")
  @Middlewares(validateBody(UpdateUserDTO))
  update(@Body() body: UpdateUserDTO, @Param("id") id: string) {
    return this.userService.updateUserById(body, id);
  }

  @Delete("/:id")
  @Middlewares(permissionMiddleware())
  delete() {
    return { message: "deleted" };
  }
}

export default UserController;
