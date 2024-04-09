import { Document, ObjectId } from "mongoose";

export interface IUserDocument extends Document {
  _id: string | ObjectId;
  refreshToken: string;
  password: string;
  email: string;
  avatar: string;

  address: string;
  firstName: string;
  lastName: string;
  gender: "0" | "1" | "unknow";
  phoneNumber: string;
  isStaff: boolean;
  birthday: Date;

  createdAt: Date;
  updatedAt: Date;

  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}
