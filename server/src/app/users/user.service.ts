import { IUserDocument } from "./user.interface";
import { UserModel } from "./user.model";

class UserSerivce {
  public async getUserByEmail(email: string): Promise<IUserDocument> {
    return (await UserModel.findOne({ email: email }).exec()) as IUserDocument;
  }
  public async createUser({ email, password }: { email: string, password: string }) {
    const newUser = new UserModel({ email, password });
    await newUser.save();
    return newUser;
  }
}

export const userService: UserSerivce = new UserSerivce();
