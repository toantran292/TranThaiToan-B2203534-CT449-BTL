import { Controller, Dependencies } from "@decorators";
import BookService from "@root/app/books/book.service";

@Dependencies(BookService)
@Controller("/api/books")
class BookController {
  constructor(private bookService: BookService) {}
  // getAll()
}

export default BookController;
