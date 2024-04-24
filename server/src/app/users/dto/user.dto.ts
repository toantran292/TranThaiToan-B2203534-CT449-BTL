import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  birthDay: Date;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  gender: "unknow" | "0" | "1";

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsBoolean()
  isStaff: boolean;

  @IsString()
  avatar: string;

  @IsEmail({}, { message: "Trường email bạn nhập không phải định dạng email" })
  @IsNotEmpty({ message: "Trường email không được để trống." })
  email: string;

  @IsString({ message: "Mật khẩu phải có kiểu chuỗi" })
  @IsNotEmpty({ message: "Trường mật khẩu không được để trống." })
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  birthDay: Date;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  gender: "unknow" | "0" | "1";

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsBoolean()
  isStaff: boolean;

  @IsString()
  avatar: string;
}
