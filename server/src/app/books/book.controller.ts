import BookCreateDTO from "@books/dto/book.dto";
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
import permissionMiddleware from "@middleware/permission.middleware";
import validateBody from "@middleware/validate";
import BookService from "@root/app/books/book.service";

@Dependencies(BookService)
@Controller("/api/books")
class BookController {
  constructor(private bookService: BookService) {}
  // getAll()

  @Get()
  getAll(@Query() query) {
    return this.bookService.getAllBook(query);
  }

  @Post()
  @Middlewares(
    jwtMiddleware(),
    permissionMiddleware(),
    validateBody(BookCreateDTO),
  )
  create(@Body() body) {
    return this.bookService.createBook(body);
  }

  @Get("/:id")
  getOne(@Param("id") id) {
    return this.bookService.getBookById(id);
  }

  @Patch("/:id")
  @Middlewares(validateBody(BookCreateDTO))
  update(@Param("id") id, @Body() body) {
    return this.bookService.updateBookById(body, id);
  }
}

export default BookController;
