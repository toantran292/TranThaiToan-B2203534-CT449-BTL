import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthRegisterDTO {
  @IsEmail()
  @IsNotEmpty({ message: "Email is required." })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required." })
  password: string;
}

export class AuthLogInDTO {
  @IsEmail()
  @IsNotEmpty({ message: "Email is required." })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required." })
  password: string;
}
