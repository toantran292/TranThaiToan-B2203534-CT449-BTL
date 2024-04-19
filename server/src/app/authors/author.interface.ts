import { Document, ObjectId } from "mongoose";

export interface IAuthorDocument extends Document {
  _id: string | ObjectId;
  name: string;
  address: string;
}
