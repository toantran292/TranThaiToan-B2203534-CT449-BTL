import { Injectable } from "@decorators";
import { CreateUserDTO, UpdateUserDTO } from "@users/dto";
import { IUserDocument, UserQuery } from "./user.interface";
import { UserModel } from "./user.model";

@Injectable()
class UserService {
  getAllUser(query: UserQuery) {
    const excludeField = ["firstName", "lastName", "email", "phoneNumber"];
    let filter = excludeField.reduce<any>(
      (prev, key) => {
        prev["$or"].push({ [key]: { $regex: new RegExp(query.q) } });
        return prev;
      },
      { $or: [] },
    );

    // const filter = Object.keys(query).reduce((prev, key) => {
    //   console.log(query[key]);
    //   return { ...prev, [key]: { $regex: new RegExp(query[key], "i") } };
    // }, {});
    // let queryString = JSON.stringify(query);
    // queryString = queryString.replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   (match) => `$${match}`,
    // );
    // console.log(queryString);
    return UserModel.find(filter);
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
