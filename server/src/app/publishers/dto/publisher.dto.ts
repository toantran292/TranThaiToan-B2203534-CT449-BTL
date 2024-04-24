import { IsNotEmpty, IsString } from "class-validator";

export class PublisherCreateDTO {
  @IsString({ message: "Trường tên tác giả phải là chuỗi" })
  @IsNotEmpty({ message: "Trường tên tác giả không được để trống" })
  name: string;

  @IsString({ message: "Trường địa chỉ phải là chuỗi" })
  @IsNotEmpty({ message: "Trường địa chỉ không được để trống" })
  address: string;
}
