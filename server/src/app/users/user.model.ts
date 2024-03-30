import mongoose, { Model, Schema, SchemaOptions, model } from "mongoose";
import { IUserDocument } from "./user.interface";
import { compare, hash } from "bcrypt";

const userOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      delete ret.password;
      return ret;
    },
  },
};

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    birthDay: { type: Date, default: new Date.now() },
    address: { type: String, default: "" },
    gender: { type: String, default: "unknow" },
    phoneNumber: { type: String, default: "" },

    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    refreshToken: { type: String, default: "" },
  },
  userOptions,
);

const SALT_ROUND = 10;

userSchema.pre("save", async function (this: IUserDocument, next: () => void) {
  const hashedPassword: string = await hash(
    this.password as string,
    SALT_ROUND,
  );
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  const hashedPassword: string = (this as IUserDocument).password!;
  return compare(password, hashedPassword);
};

userSchema.methods.hashedPassword = async function (
  password: string,
): Promise<string> {
  return hash(password, SALT_ROUND);
};

const UserModel: Model<IUserDocument> = model<IUserDocument>(
  "User",
  userSchema,
  "User",
);
export { UserModel };
