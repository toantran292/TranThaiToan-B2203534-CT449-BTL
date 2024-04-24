import { IAuthorDocument } from "@authors/author.interface";
import { IPublisherDocument } from "@publishers/publisher.interface";

export interface IBookDocument extends Document {
  name: string;
  unitCost: number;
  stock: number;
  publishYear: number;
  author: IAuthorDocument;
  publisher: IPublisherDocument;
}
