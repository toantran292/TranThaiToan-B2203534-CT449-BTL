import { loginSchema, registerSchema } from "@auth/auth.schema";
import { authService } from "@auth/auth.service";
import { Controller } from "@decorators/controller";
import { Post } from "@decorators/route";
import { Validate } from "@decorators/validate";
import { BadRequestError, CustomError, Forbidden } from "@utils/errorHandler";
import { Request, Response } from "express";
import { IUserDocument } from "../users/user.interface";
import { userService } from "../users/user.service";

@Controller('/auth')
class AuthController {
  @Post('/register')
  @Validate(registerSchema)
  async register(req: Request, res: Response) {
    try {

      const { email, password } = req.body;
      const isUserExist: IUserDocument =
        await userService.getUserByEmail(email);

      if (isUserExist) throw new BadRequestError('Email already existed.');

      const user = await userService.createUser({ email, password })
      const token = authService.signToken({ user });
      return res.status(200).json(token);

    } catch (error) {

      if (error instanceof CustomError)
        return res.status(error.statusCode).json({ message: error.message })

    }

  }

  @Post('/login')
  @Validate(loginSchema)
  async login(req: Request, res: Response) {
    try {

      const _message_forbidden = 'Email or password is wrong.';

      const { email, password } = req.body;
      const existingUser: IUserDocument =
        await userService.getUserByEmail(email);
      if (!existingUser) throw new Forbidden(_message_forbidden);

      const validPassword = await existingUser.comparePassword(password);
      if (!validPassword) throw new Forbidden(_message_forbidden);

      const token = authService.signToken({ user: existingUser });
      return res.status(200).json(token);

    } catch (error) {

      if (error instanceof CustomError)
        return res.status(error.statusCode).json({ message: error.message })

    }
  }
}


export default AuthController;
