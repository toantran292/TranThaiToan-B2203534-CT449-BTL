import { Injectable } from "@decorators";
import { CreateUserDTO, UpdateUserDTO } from "@users/dto";
import { IUserDocument } from "./user.interface";
import { UserModel } from "./user.model";

@Injectable()
class UserService {
  getAllUser() {
    return UserModel.find();
  }
  async getUserByEmail(email: string): Promise<IUserDocument> {
    return (await UserModel.findOne({ email: email }).exec()) as IUserDocument;
  }
  getUserById(id: string) {
    return UserModel.findById(id);
  }
  updateUserById(data: UpdateUserDTO, id: string) {
    const filter = { _id: id };
    const updateOperation = { $set: data };
    const updateOptions = { new: true };
    return UserModel.findOneAndUpdate(filter, updateOperation, updateOptions);
  }

  async createUser(data: CreateUserDTO) {
    const newUser = new UserModel(data);
    await newUser.save();
    return newUser;
  }
}

export default UserService;
