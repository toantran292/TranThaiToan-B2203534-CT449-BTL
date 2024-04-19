import AuthorService from "@authors/author.service";
import { Dependencies, Injectable } from "@decorators";
import PublisherService from "@publishers/publisher.service";

@Dependencies(PublisherService, AuthorService)
@Injectable()
class BookService {
  createBook() {}

  getAllBook() {}

  getBookById() {}

  updateBookById() {}
}

export default BookService;
