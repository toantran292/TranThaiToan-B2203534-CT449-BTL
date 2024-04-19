import { IPublisherDocument } from "@publishers/publisher.interface";
import { Model, Schema, SchemaOptions, model } from "mongoose";

const publisherOptions: SchemaOptions = {
  timestamps: true,
};

const publisherSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
  },
  publisherOptions,
);

const PublisherModel: Model<IPublisherDocument> = model<IPublisherDocument>(
  "Publisher",
  publisherSchema,
  "Publisher",
);

export { PublisherModel };
