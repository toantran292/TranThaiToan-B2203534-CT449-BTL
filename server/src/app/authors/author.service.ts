import { AuthorModel } from "@authors/author.model";
import { AuthorCreateDTO } from "@authors/dto";
import { Injectable } from "@decorators";
import { getFilterManyField } from "@root/utils/filter.util";
import { ObjectId } from "mongoose";

@Injectable()
class AuthorService {
  getAllAuthor(query) {
    let filter = getFilterManyField(["name", "address"], query);
    return AuthorModel.find(filter);
  }
  getAuthorById(id: string | ObjectId) {
    return AuthorModel.findById(id);
  }
  updateAuthorById(data: AuthorCreateDTO, id: string) {
    const filter = { _id: id };
    const updateOperation = { $set: data };
    const updateOptions = { new: true };
    return AuthorModel.findOneAndUpdate(filter, updateOperation, updateOptions);
  }

  async createAuthor(data: AuthorCreateDTO) {
    const newAuthor = new AuthorModel(data);
    await newAuthor.save();
    return newAuthor;
  }
}

export default AuthorService;
