import { IAuthorDocument } from "@root/app/authors/author.interface";

export interface IBookDocument extends Document {
  name: string;
  unitCost: number;
  stock: number;
  publishYear: number;
  author: IAuthorDocument;
}
