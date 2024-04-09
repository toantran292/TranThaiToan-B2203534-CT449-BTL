import { AuthRegisterDTO } from "@auth/dto";
import { Injectable } from "@decorators";
import { IUserDocument } from "@users/user.interface";
import { Forbidden, signJwtRfToken, signJwtToken } from "@utils";

@Injectable()
class AuthService {
  async login(authRegisterDTO: AuthRegisterDTO, existingUser: IUserDocument) {
    const _message_forbidden = "Sai tài khoản hoặc mật khẩu.";

    const { password } = authRegisterDTO;

    if (!existingUser) throw new Forbidden(_message_forbidden);

    const validPassword = await existingUser.comparePassword(password);
    if (!validPassword) throw new Forbidden(_message_forbidden);
    const data = this.signToken(existingUser);
    return data;
  }

  signToken(user: IUserDocument) {
    const userData = this.getUserData(user);
    const accessToken = signJwtToken(userData);
    const refreshToken = signJwtRfToken(userData);

    return { user: userData, token: { accessToken, refreshToken } };
  }

  getUserData(user: IUserDocument) {
    user = user.toJSON();
    return {
      userId: user._id,
      isStaff: user.isStaff,
      email: user.email,
      firstName: user.firstName,
      avatar: user.avatar,
    };
  }
}

export default AuthService;
