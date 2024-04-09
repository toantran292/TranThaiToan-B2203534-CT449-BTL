import { Injectable } from "@decorators";
import { BadRequestError } from "@utils";

@Injectable()
class PhotoService {
  getImagePath(file: Express.Multer.File | undefined, folder: string) {
    if (!file)
      throw new BadRequestError(`Không được để trường ${folder} trống`);
    return { imgPath: `${folder}/${file.filename}` };
  }
}

export default PhotoService;
