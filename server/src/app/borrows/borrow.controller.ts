import BorrowService from "@borrows/borrow.service";
import {
  Body,
  Controller,
  Dependencies,
  Get,
  Middlewares,
  Param,
  Patch,
  Post,
  User,
} from "@decorators";
import jwtMiddleware from "@middleware/jwt.middleware";

@Dependencies(BorrowService)
@Controller("/api/borrows")
class BorrowController {
  constructor(private borrowService: BorrowService) {}
  @Get()
  @Middlewares(jwtMiddleware())
  getAll(@User() user) {
    return this.borrowService.getAll(user);
  }

  @Post()
  @Middlewares(jwtMiddleware())
  borrowBook(@Body() body, @User() user) {
    return this.borrowService.borrowBook(body, user);
  }

  @Patch(":id")
  @Middlewares(jwtMiddleware())
  returnBook(@Param("id") id, @User() user) {
    return this.borrowService.returnBook(id, user);
  }
}

export default BorrowController;
