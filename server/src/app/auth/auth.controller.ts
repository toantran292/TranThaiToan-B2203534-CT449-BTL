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
import { verifyJwtRfToken } from "@utils";
import { Request } from "express";
@Dependencies(AuthService)
@Controller("/auth")
class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/register")
  @Middlewares(validateBody(AuthRegisterDTO))
  async register(@Body<AuthRegisterDTO>() body) {
    // const { email, password } = body;
    // const isUserExist: IUserDocument = await this.userService.getUserByEmail(
    //   email,
    // );

    // if (isUserExist) throw new BadRequestError("Email đã tồn tại.");

    return {};
    // const user = await this.userService.createUser({ email, password });
    // const data = this.authService.signToken(user);
    // return data;
  }

  @Post("/login")
  @Middlewares(validateBody(AuthLogInDTO))
  login(@Body() body: AuthLogInDTO) {
    return this.authService.login(body);
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
