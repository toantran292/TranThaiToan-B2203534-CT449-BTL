import { AuthPayload } from "@auth/interfaces/auth.interface";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "@cofig/config";
import { Forbidden } from "@utils";
import jwt from "jsonwebtoken";

export const decodeJwtToken = (data: any) => {
  return jwt.decode(data);
};

export const signJwtToken = (data: any) => {
  return jwt.sign(data, JWT_ACCESS_TOKEN, {
    expiresIn: "30d",
  });
};

export const signJwtRfToken = (data: any) => {
  return jwt.sign(data, JWT_REFRESH_TOKEN, {
    expiresIn: "1d",
  });
};

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_TOKEN);
};
export const verifyJwtRfToken = (token: string, _user: AuthPayload) => {
  try {
    const data = jwt.verify(token, JWT_REFRESH_TOKEN) as AuthPayload;
    if (data.userId !== _user.userId) throw new Error();

    const { avatar, email, firstName, isStaff, userId } = _user;

    const newToken = signJwtToken({
      avatar,
      email,
      firstName,
      isStaff,
      userId,
    });
    return newToken;
  } catch (error) {
    throw new Forbidden("Refresh Token is not valid");
  }
};
