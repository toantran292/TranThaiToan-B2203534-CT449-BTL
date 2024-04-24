import { AuthPayload } from "@auth/interfaces/auth.interface";
import { Injectable } from "@decorators";
import { getFilterManyField } from "@root/utils/filter.util";
import { CreateUserDTO, UpdateUserDTO } from "@users/dto";
import { BadRequestError, Forbidden } from "@utils";
import { IUserDocument, UserQuery } from "./user.interface";
import { UserModel } from "./user.model";

@Injectable()
class UserService {
  getAllUser(query: UserQuery) {
    const excludeField = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "address",
    ];
    let filter = getFilterManyField(excludeField, query);

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
  async getUserById(id: string, user: AuthPayload) {
    if (!user.isStaff && id !== user.userId) {
      throw new Forbidden("Bạn không có quyền này");
    }

    const _user = await UserModel.findById(id).exec();
    if (!_user) throw new BadRequestError("Không tìm thấy người dùng");
    return user;
  }
  updateUserById(data: UpdateUserDTO, id: string) {
    // this.getUserById(id);
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
