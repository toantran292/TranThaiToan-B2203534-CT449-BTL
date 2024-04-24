import { IsNotEmpty, IsString } from "class-validator";

export class AuthorCreateDTO {
  @IsString({ message: "Trường tên tác giả phải là chuỗi" })
  @IsNotEmpty({ message: "Trường tên tác giả không được để trống" })
  name: string;
}
