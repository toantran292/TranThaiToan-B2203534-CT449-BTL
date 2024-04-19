import AuthorService from "@authors/author.service";
import BookCreateDTO from "@books/dto/book.dto";
import { Dependencies, Injectable } from "@decorators";
import PublisherService from "@publishers/publisher.service";

@Dependencies(PublisherService, AuthorService)
@Injectable()
class BookService {
  constructor(
    private publisherService: PublisherService,
    private authorService: AuthorService,
  ) {}
  createBook(data: BookCreateDTO) {}

  getAllBook() {}

  getBookById() {}

  updateBookById() {}
}

export default BookService;
