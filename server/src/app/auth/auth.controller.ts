import { loginSchema, registerSchema } from "@auth/auth.schema";
import { authService } from "@auth/auth.service";
import { Controller } from "@global/decoractors/controller";
import { Post } from "@global/decoractors/route";
import { Validate } from "@global/decoractors/validate";
import { BadRequestError, Forbidden } from "@global/utils/errorHandler";
import { Request, Response } from "express";
import { IUserDocument } from "../users/user.interface";
import { userService } from "../users/user.service";

@Controller('/auth')
class AuthController {
  @Post('/register')
  @Validate(registerSchema)
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const isUserExist: IUserDocument =
      await userService.getUserByEmail(email);

    if (isUserExist) throw new BadRequestError('Email already existed.');

    const user = await userService.createUser({ email, password })
    const token = authService.signToken({ user });
    return res.status(200).json(token);
  }

  @Post('/login')
  @Validate(loginSchema)
  async login(req: Request, res: Response) {
    const _message_forbidden = 'Email or password is wrong.';

    const { email, password } = req.body;
    const existingUser: IUserDocument =
      await userService.getUserByEmail(email);
    if (!existingUser) throw new Forbidden(_message_forbidden);

    const validPassword = await existingUser.comparePassword(password);
    if (!validPassword) throw new Forbidden(_message_forbidden);

    const token = authService.signToken({ user: existingUser });
    return res.status(200).json(token);
  }
}


export default AuthController;
