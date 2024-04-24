import AuthorService from "@authors/author.service";
import { BookModel } from "@books/book.model";
import BookCreateDTO from "@books/dto/book.dto";
import { Dependencies, Injectable } from "@decorators";
import PublisherService from "@publishers/publisher.service";
import { getFilterManyField } from "@root/utils/filter.util";
import { BadRequestError } from "@utils";
import { ObjectId } from "mongoose";

@Dependencies(PublisherService, AuthorService)
@Injectable()
class BookService {
  constructor(
    private publisherService: PublisherService,
    private authorService: AuthorService,
  ) {}
  async createBook(data: BookCreateDTO) {
    const publisher = this.publisherService.getPublisherById(data.publisher);
    if (!publisher) throw new BadRequestError("Không tìm thấy nhà xuất bản");
    const author = this.authorService.getAuthorById(data.author);
    if (!author) throw new BadRequestError("Không tìm thấy tác giả");

    const newBook = new BookModel(data);
    await newBook.save();
    return newBook;
  }

  getAllBook(query) {
    let filter = getFilterManyField(["name"], query);
    return BookModel.find(filter)
      .populate("author", "name")
      .populate("publisher", "name");
  }

  getBookById(id: string | ObjectId) {
    return BookModel.findById(id);
  }

  updateBookById(data: BookCreateDTO, id: string) {
    const filter = { _id: id };
    const updateOperation = { $set: data };
    const updateOptions = { new: true };
    return BookModel.findOneAndUpdate(filter, updateOperation, updateOptions);
  }
}

export default BookService;
