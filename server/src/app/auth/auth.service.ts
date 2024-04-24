import { AuthRegisterDTO } from "@auth/dto";
import { Dependencies, Injectable } from "@decorators";
import { IUserDocument } from "@users/user.interface";
import UserService from "@users/user.service";
import { Forbidden, signJwtRfToken, signJwtToken } from "@utils";

@Dependencies(UserService)
@Injectable()
class AuthService {
  constructor(private userService: UserService) {}
  async login(authRegisterDTO: AuthRegisterDTO) {
    const { email, password } = authRegisterDTO;
    const _message_forbidden = "Sai tài khoản hoặc mật khẩu.";

    const existingUser: IUserDocument = await this.userService.getUserByEmail(
      email,
    );

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
