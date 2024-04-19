import { IAuthorDocument } from "@root/app/authors/author.interface";
import { Model, Schema, SchemaOptions, model } from "mongoose";

const authorOptions: SchemaOptions = {
  timestamps: true,
};

const authorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
  },
  authorOptions,
);

const AuthorModel: Model<IAuthorDocument> = model<IAuthorDocument>(
  "Author",
  authorSchema,
  "Author",
);

export { AuthorModel };
