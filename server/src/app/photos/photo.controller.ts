import { Controller, Post, Req, UploadFile } from "@decorators";
import jwtMiddleware from "@middleware/jwt.middleware";
import { Request } from "express";

@Controller("/api/photos", jwtMiddleware())
class PhotoController {
  @Post("/avatar")
  @UploadFile("avatar")
  uploadAvatar(@Req() req: Request) {
    console.log(req.file);
    return { avatar: req.file };
  }
}

export default PhotoController;
