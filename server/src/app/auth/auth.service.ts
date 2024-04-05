import { AuthRegisterDTO } from "@auth/dto";
import { jwtConfig } from "@cofig/config";
import { Injectable } from "@decorators";
import { IUserDocument } from "@users/user.interface";
import { Forbidden } from "@utils";

import jwt from "jsonwebtoken";

@Injectable()
class AuthService {
  async login(authRegisterDTO: AuthRegisterDTO, existingUser: IUserDocument) {
    const _message_forbidden = "Email or password is wrong.";

    const { password } = authRegisterDTO;

    if (!existingUser) throw new Forbidden(_message_forbidden);

    const validPassword = await existingUser.comparePassword(password);
    if (!validPassword) throw new Forbidden(_message_forbidden);
    const data = this.signToken(existingUser);
    return data;
  }

  signToken(user: IUserDocument) {
    const userData = this.getUserData(user);
    const accessToken = jwt.sign(userData, jwtConfig.JWT_ACCESS_TOKEN!, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(userData, jwtConfig.JWT_REFRESH_TOKEN!, {
      expiresIn: "7d",
    });

    return { user: userData, token: { accessToken, refreshToken } };
  }

  getUserData(user: IUserDocument) {
    return {
      userId: user.id,
      isStaff: user.isStaff,
      email: user.email,
    };
  }
}

export default AuthService;
