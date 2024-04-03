import { LoginSchema, RegiserSchema } from "@auth/auth.schema";
import { jwtConfig } from "@cofig/config";
import { Injectable } from "@decorators";
import { IUserDocument } from "@users/user.interface";
import { Forbidden } from "@utils";

import jwt from "jsonwebtoken";

@Injectable()
class AuthService {
  async register(data: RegiserSchema) {}

  async login(data: LoginSchema, existingUser: IUserDocument) {
    const _message_forbidden = "Email or password is wrong.";

    if (!existingUser) throw new Forbidden(_message_forbidden);

    const validPassword = await existingUser.comparePassword(data.password);
    if (!validPassword) throw new Forbidden(_message_forbidden);
    const token = this.signToken({ user: existingUser });
    return token;
  }

  signToken({ user }: { user: IUserDocument }) {
    const accessToken = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isStaff,
        email: user.email,
      },
      jwtConfig.JWT_ACCESS_TOKEN!,
      { expiresIn: "1h" },
    );
    const refreshToken = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isStaff,
        email: user.email,
      },
      jwtConfig.JWT_ACCESS_TOKEN!,
      { expiresIn: "7d" },
    );

    return { accessToken, refreshToken };
  }
}

export default AuthService;
