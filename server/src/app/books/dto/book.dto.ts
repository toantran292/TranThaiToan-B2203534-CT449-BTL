import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";
import { ObjectId } from "mongoose";

class BookCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  unitCost: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  publishYear: number;

  @IsMongoId()
  @IsNotEmpty()
  author: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  publisher: ObjectId;
}

export default BookCreateDTO;
