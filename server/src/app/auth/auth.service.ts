import { jwtConfig } from "@cofig/config";
import { IUserDocument } from "@users/user.interface";

import jwt from "jsonwebtoken";

class AuthService {
  public signToken({ user }: { user: IUserDocument }) {
    const accessToken = jwt.sign({
      userId: user.id,
      isAdmin: user.isStaff,
      email: user.email
    }, jwtConfig.JWT_ACCESS_TOKEN!, { expiresIn: "1h" });
    const refreshToken = jwt.sign({
      userId: user.id,
      isAdmin: user.isStaff,
      email: user.email
    }, jwtConfig.JWT_ACCESS_TOKEN!, { expiresIn: "7d" });

    return { accessToken, refreshToken };
  }
};

export const authService = new AuthService();
