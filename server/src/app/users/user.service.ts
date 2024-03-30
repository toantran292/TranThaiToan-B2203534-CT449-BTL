import { IUserDocument } from "./user.interface";
import { UserModel } from "./user.model";

class UserSerivces {
  public async getUserByEmail(email: string): Promise<IUserDocument> {
    return (await UserModel.findOne({ email: email }).exec()) as IUserDocument;
  }
  public async createUser(username: string, password: string) {
    const newUser = await new UserModel({ username, password });
    await newUser.save();
    return newUser;
  }
}

export const userServices: UserSerivces = new UserSerivces();
