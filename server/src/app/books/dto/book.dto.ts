import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

  @IsString()
  @IsOptional()
  cover: string;

  @IsMongoId()
  @IsNotEmpty()
  publisher: ObjectId;
}

export default BookCreateDTO;
