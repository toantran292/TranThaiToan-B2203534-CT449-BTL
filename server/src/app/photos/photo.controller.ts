import { Controller, Dependencies, Post, Req, UploadFile } from "@decorators";
import jwtMiddleware from "@middleware/jwt.middleware";
import PhotoService from "@root/app/photos/photo.service";
import { Request } from "express";

@Dependencies(PhotoService)
@Controller("/api/photos", jwtMiddleware())
class PhotoController {
  constructor(private photoService: PhotoService) {}
  @Post("/avatar")
  @UploadFile("avatar")
  uploadAvatar(@Req<Request>("file") file: Express.Multer.File | undefined) {
    return this.photoService.getImagePath(file, "avatar");
  }

  @Post("/cover")
  @UploadFile("cover")
  uploadCover(@Req<Request>("file") file: Express.Multer.File | undefined) {
    return this.photoService.getImagePath(file, "cover");
  }
}

export default PhotoController;
