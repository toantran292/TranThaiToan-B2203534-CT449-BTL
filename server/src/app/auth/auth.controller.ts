import AuthService from "@auth/auth.service";
import { AuthLogInDTO, AuthRegisterDTO } from "@auth/dto";
import { Body, Controller, Dependencies, Middlewares, Post } from "@decorators";
import validateBody from "@middleware/validate";
import { IUserDocument } from "@users/user.interface";
import UserSerivce from "@users/user.service";
import { BadRequestError } from "@utils";

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

    if (isUserExist) throw new BadRequestError("Email already existed.");

    const user = await this.userService.createUser({ email, password });
    const token = this.authService.signToken({ user });
    return token;
  }

  @Post("/login")
  @Middlewares(validateBody(AuthLogInDTO))
  async login(@Body() body: AuthLogInDTO) {
    const existingUser: IUserDocument = await this.userService.getUserByEmail(
      body.email,
    );
    return this.authService.login(body, existingUser);
  }
}

export default AuthController;
