import { AuthorModel } from "@authors/author.model";
import { Injectable } from "@decorators";

@Injectable()
class AuthorService {
  getAllAuthor() {
    return AuthorModel.find();
  }
}

export default AuthorService;
