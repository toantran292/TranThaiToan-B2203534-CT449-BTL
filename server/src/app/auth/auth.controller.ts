import AuthService from "@auth/auth.service";
import { AuthLogInDTO, AuthRegisterDTO } from "@auth/dto";
import { AuthPayload } from "@auth/interfaces/auth.interface";
import {
  Body,
  Controller,
  Dependencies,
  Middlewares,
  Post,
  Req,
} from "@decorators";
import jwtMiddleware, { TYPE_JWT } from "@middleware/jwt.middleware";
import validateBody from "@middleware/validate";
import { IUserDocument } from "@users/user.interface";
import UserSerivce from "@users/user.service";
import { BadRequestError, verifyJwtRfToken } from "@utils";
import { Request } from "express";
@Dependencies(AuthService, UserSerivce)
@Controller("/auth")
class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserSerivce,
  ) {}
  @Post("/register")
  @Middlewares(validateBody(AuthRegisterDTO))
  async register(@Body() body: AuthRegisterDTO) {
    const { email, password } = body;
    const isUserExist: IUserDocument = await this.userService.getUserByEmail(
      email,
    );

    if (isUserExist) throw new BadRequestError("Email đã tồn tại.");

    const user = await this.userService.createUser({ email, password });
    const data = this.authService.signToken(user);
    return data;
  }

  @Post("/login")
  @Middlewares(validateBody(AuthLogInDTO))
  async login(@Body() body: AuthLogInDTO) {
    const existingUser: IUserDocument = await this.userService.getUserByEmail(
      body.email,
    );
    return this.authService.login(body, existingUser);
  }

  @Post("/token")
  @Middlewares(jwtMiddleware(TYPE_JWT.CHECK))
  refreshToken(
    @Body("refreshToken") rfToken: string,
    @Req<Request>("_user") _user: AuthPayload,
  ) {
    const token = verifyJwtRfToken(rfToken, _user);
    return { token };
  }
}

export default AuthController;
