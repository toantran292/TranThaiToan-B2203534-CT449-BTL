// import { Controller } from "@decorators/controller";
// import { Body, Post } from "@decorators/route";
// import { Validate } from "@decorators/validate";
import { LoginSchema, loginSchema } from "@auth/auth.schema";
import AuthService from "@auth/auth.service";
import { Controller, Dependencies, Post, Validate } from "@decorators";
import { IUserDocument } from "@users/user.interface";
import UserSerivce from "@users/user.service";

@Dependencies(AuthService, UserSerivce)
@Controller("/auth")
class AuthController {
  constructor(private authService: AuthService, private userService: UserSerivce) {}
  // @Post('/register')
  // @Validate(registerSchema)
  // async register(@Body() body: RegiserSchema) {
  //   const { email, password } = body;
  //   const isUserExist: IUserDocument =
  //     await userService.getUserByEmail(email);

  //   if (isUserExist) throw new BadRequestError('Email already existed.');

  //   const user = await userService.createUser({ email, password })
  //   const token = authService.signToken({ user });
  //   return token;

  // }

  @Post("/login")
  @Validate(loginSchema)
  async login(req: Request) {
    const data = req.body as any as LoginSchema;
    const existingUser: IUserDocument = await this.userService.getUserByEmail(data.email);
    return this.authService.login(req.body as any as LoginSchema, existingUser);
  }
}

export default AuthController;
