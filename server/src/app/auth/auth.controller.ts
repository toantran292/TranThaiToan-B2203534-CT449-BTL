import { Request, Response } from "express";
import { IUserDocument } from "../users/user.interface";
import { userServices } from "../users/user.service";
import { throws } from "assert";

export class AuthController {
  public static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const existingUser: IUserDocument =
        await userServices.getUserByEmail(email);

      if (existingUser) throw new Error();

      const user = userServices.

      //
      return res.status(200).json({ message: "Register successfully" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Someting error! Please try again." });
    }
  }
}
