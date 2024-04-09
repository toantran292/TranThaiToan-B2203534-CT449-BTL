import { Controller, Post, Req, UploadFile } from "@decorators";
import { Request } from "express";

@Controller("/api/photos")
class PhotoController {
  @Post("/avatar")
  @UploadFile("avatar")
  uploadAvatar(@Req() req: Request) {
    console.log(req.file);
    return { avatar: req.file };
  }
}

export default PhotoController;
