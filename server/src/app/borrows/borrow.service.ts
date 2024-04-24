import { AuthPayload } from "@auth/interfaces/auth.interface";
import BookService from "@books/book.service";
import { BorrowModel } from "@borrows/borrow.model";
import { Dependencies, Injectable } from "@decorators";
import { BadRequestError } from "@utils";
import { ObjectId } from "mongoose";

@Dependencies(BookService)
@Injectable()
class BorrowService {
  constructor(private bookService: BookService) {}

  getAll(user: AuthPayload) {
    const filter = {};
    if (!user.isStaff) filter["user"] = user.userId;

    return BorrowModel.find(filter).populate("book", "name");
  }

  getOne(id: string | ObjectId, user: AuthPayload) {
    const filter = { _id: id };
    if (!user.isStaff) filter["user"] = user.userId;

    return BorrowModel.find(filter).populate("book", "name");
  }

  getBorrowBookById(id: string | ObjectId) {
    return BorrowModel.findById(id);
  }

  borrowedBooks(id: string | ObjectId) {
    return BorrowModel.find({ book: id, actualReturnDate: null });
  }

  async borrowBook(body: any, user: AuthPayload) {
    const id = body.id as string | ObjectId;
    const book = await this.bookService.getBookById(id);
    if (!book) throw new BadRequestError("Không tìm thấy sách");

    const borrowedBooks = await this.borrowedBooks(id);

    if (book.stock <= 0) throw new BadRequestError("Số lượng không đủ");

    const data = {
      user: user.userId,
      book: id,
    };

    book.stock = book.stock - 1;
    book.save();
    const newBorrow = new BorrowModel(data);
    await newBorrow.save();

    return "Mượn sách thành công";
  }

  async returnBook(id: string | ObjectId, user: AuthPayload) {
    const borrowBook = await BorrowModel.findOne({
      _id: id,
      actualReturnDate: null,
      user: user.userId,
    }).exec();
    if (!borrowBook) throw new BadRequestError("Không tìm thấy thông tin mượn");
    const book = await this.bookService.getBookById(borrowBook.book);
    if (!book) throw new BadRequestError("Không tìm thấy thông tin mượn");

    book.stock = book.stock++;
    book.save();
    borrowBook.actualReturnDate = new Date();
    borrowBook.save();

    return "Trả sách thành công";
  }
}

export default BorrowService;
