import { AsyncCatchCustomError } from "@global/decoractors/catchError";
import { BadRequestError } from "@global/utils/errorHandler";
import { Request, Response } from "express";
import { IUserDocument } from "../users/user.interface";
import { userService } from "../users/user.service";


class AuthController {
  @AsyncCatchCustomError
  public async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const isUserExist: IUserDocument =
      await userService.getUserByEmail(email);

    if (isUserExist) throw new BadRequestError('Email already existed.');

    userService.createUser({ email, password })

    return res.status(200).json({ message: "Register successfully, please login!" });
  }

  @AsyncCatchCustomError
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const existingUser: IUserDocument =
      await userService.getUserByEmail(email);
    if (!existingUser) throw new BadRequestError('Email or passwornd is wrong.');

    return res.status(200).json({ message: "Login Successfully!" });
  }
}


export const authController: AuthController = new AuthController();
