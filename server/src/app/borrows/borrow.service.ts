import { AuthPayload } from "@auth/interfaces/auth.interface";
import BookService from "@books/book.service";
import { BorrowModel } from "@borrows/borrow.model";
import { Dependencies, Injectable } from "@decorators";
import UserService from "@users/user.service";
import { BadRequestError } from "@utils";
import { ObjectId } from "mongoose";

@Dependencies(UserService, BookService)
@Injectable()
class BorrowService {
  constructor(private bookService: BookService) {}

  getBorrowBookById(id: string | ObjectId) {
    return BorrowModel.findById(id);
  }

  borrowedBooks(id: string | ObjectId) {
    return BorrowModel.find({ book: id, actualReturnDate: null });
  }

  async borrowBook(id: string | ObjectId, user: AuthPayload) {
    const book = await this.bookService.getBookById(id);
    if (!book) throw new BadRequestError("Không tìm thấy sách");

    const borrowedBooks = await this.borrowedBooks(id);

    if (book.stock <= borrowedBooks.length)
      throw new BadRequestError("Số lượng không đủ");

    const data = {
      user: user.userId,
      book: id,
    };

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

    borrowBook.actualReturnDate = new Date();
    borrowBook.save();

    return "Trả sách thành công";
  }
}

export default BorrowService;
