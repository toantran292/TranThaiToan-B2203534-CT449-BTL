import AuthorService from "@authors/author.service";
import { AuthorCreateDTO } from "@authors/dto";
import {
  Body,
  Controller,
  Dependencies,
  Get,
  Middlewares,
  Param,
  Patch,
  Post,
  Query,
} from "@decorators";
import jwtMiddleware from "@middleware/jwt.middleware";
import validateBody from "@middleware/validate";

@Dependencies(AuthorService)
@Controller("/api/authors", jwtMiddleware())
class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  getAll(@Query() query) {
    return this.authorService.getAllAuthor(query);
  }

  @Post()
  @Middlewares(validateBody(AuthorCreateDTO))
  create(@Body() body) {
    return this.authorService.createAuthor(body);
  }

  @Get("/:id")
  getOne(@Param("id") id) {
    return this.authorService.getAuthorById(id);
  }

  @Patch("/:id")
  @Middlewares(validateBody(AuthorCreateDTO))
  update(@Param("id") id, @Body() body) {
    return this.authorService.updateAuthorById(body, id);
  }
}

export default AuthorController;
