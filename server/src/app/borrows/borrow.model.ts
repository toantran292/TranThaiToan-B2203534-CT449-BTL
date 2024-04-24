import { IBorrowDocument } from "@borrows/borrow.interface";
import { Model, Schema, SchemaOptions, model } from "mongoose";

const borrowOptions: SchemaOptions = {
  timestamps: true,
};

const borrowSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowedDay: { type: Date, default: () => Date.now() },
    estimatedReturnDate: {
      type: Date,
      default: () => new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    },
    actualReturnDate: {
      type: Date,
      default: null,
    },
  },
  borrowOptions,
);

const BorrowModel: Model<IBorrowDocument> = model<IBorrowDocument>(
  "Borrow",
  borrowSchema,
  "Borrow",
);
export { BorrowModel };
