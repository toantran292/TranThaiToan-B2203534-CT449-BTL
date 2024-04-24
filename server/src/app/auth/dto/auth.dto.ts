import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthRegisterDTO {
  @IsString({ message: "Số điện thoại phải có kiểu chuỗi" })
  @IsNotEmpty({ message: "Trường số điện thoại không được để trống." })
  phoneNumber: string;

  @IsEmail({}, { message: "Trường email bạn nhập không phải định dạng email" })
  @IsNotEmpty({ message: "Trường email không được để trống." })
  email: string;

  @IsString({ message: "Mật khẩu phải có kiểu chuỗi" })
  @IsNotEmpty({ message: "Trường mật khẩu không được để trống." })
  password: string;
}

export class AuthLogInDTO {
  @IsEmail({}, { message: "Trường email bạn nhập không phải định dạng email" })
  @IsNotEmpty({ message: "Trường email không được để trống." })
  email: string;

  @IsString({ message: "Mật khẩu phải có kiểu chuỗi" })
  @IsNotEmpty({ message: "Trường mật khẩu không được để trống." })
  password: string;
}
