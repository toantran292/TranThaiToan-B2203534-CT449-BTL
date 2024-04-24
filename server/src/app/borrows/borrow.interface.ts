import { Document, ObjectId } from "mongoose";

export interface IBorrowDocument extends Document {
  user: string | ObjectId;
  book: string | ObjectId;
  borrowedDay: Date;
  estimatedReturnDate: Date;
  actualReturnDate: Date | null;

  _id: string | ObjectId;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}
