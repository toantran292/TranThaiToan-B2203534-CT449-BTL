import {
  Controller,
  Delete,
  Dependencies,
  Get,
  Patch,
  Post,
} from "@decorators";
import UserService from "@users/user.service";

@Dependencies(UserService)
@Controller("/api/users")
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

  @Delete("/:id")
  delete() {
    return { message: "deleted" };
  }
}

export default UserController;
