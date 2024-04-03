import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthRegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
