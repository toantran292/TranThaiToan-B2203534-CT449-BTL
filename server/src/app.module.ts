import AuthController from "@auth/auth.controller";
import { Module } from "@decorators";
import PhotoController from "@root/app/photos/photo.controller";
import UserController from "@users/user.controller";

@Module({
  controllers: [AuthController, UserController, PhotoController],
})
class AppModule {}

export default AppModule;
