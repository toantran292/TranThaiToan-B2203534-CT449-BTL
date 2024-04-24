import AuthController from "@auth/auth.controller";
import AuthorController from "@authors/author.controller";
import BookController from "@books/book.controller";
import BorrowController from "@borrows/borrow.controller";
import { Module } from "@decorators";
import PublisherController from "@publishers/publisher.controller";
import PhotoController from "@root/app/photos/photo.controller";
import UserController from "@users/user.controller";

@Module({
  controllers: [
    AuthController,
    UserController,
    PhotoController,
    AuthorController,
    PublisherController,
    BookController,
    BorrowController,
  ],
})
class AppModule {}

export default AppModule;
