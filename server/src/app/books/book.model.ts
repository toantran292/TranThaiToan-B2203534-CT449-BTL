import { IBookDocument } from "@root/app/books/book.interface";
import { Model, Schema, SchemaOptions, model } from "mongoose";

const bookOptions: SchemaOptions = {
  timestamps: true,
};

const bookSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    unitCost: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    publishYear: { type: Number, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Publisher",
    },
  },
  bookOptions,
);

const BookModel: Model<IBookDocument> = model<IBookDocument>(
  "Book",
  bookSchema,
  "Book",
);

export { BookModel };
