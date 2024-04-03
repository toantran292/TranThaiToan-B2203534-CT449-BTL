import AuthController from "@auth/auth.controller";
import { Module } from "@decorators";
import UserController from "@users/user.controller";

@Module({
  controllers: [AuthController, UserController],
})
class AppModule {}

export default AppModule;
