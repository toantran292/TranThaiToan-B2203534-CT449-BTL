import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

class BookCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  unicost: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsDateString()
  publishYear: number;
}

export default BookCreateDTO;
