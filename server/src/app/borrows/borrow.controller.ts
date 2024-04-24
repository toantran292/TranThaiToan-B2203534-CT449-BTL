import BorrowService from "@borrows/borrow.service";
import { Body, Controller, Dependencies, Param, Post, User } from "@decorators";

@Dependencies(BorrowService)
@Controller("/api/borrows")
class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Post()
  borrowBook(@Body() body, @User() user) {
    return this.borrowService.borrowBook(body, user);
  }

  @Post(":/id")
  returnBook(@Param("id") id, @User() user) {
    return this.borrowService.returnBook(id, user);
  }
}
