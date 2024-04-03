import { Controller, Delete, Get, Patch, Post } from "@decorators";

@Controller("/users")
class UserController {
  constructor() {}
  @Get()
  getAll() {
    throw new Error("HIHIHI");
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
