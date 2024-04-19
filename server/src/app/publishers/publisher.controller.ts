import {
  Body,
  Controller,
  Dependencies,
  Get,
  Middlewares,
  Param,
  Patch,
  Post,
  Query,
} from "@decorators";
import jwtMiddleware from "@middleware/jwt.middleware";
import validateBody from "@middleware/validate";
import { PublisherCreateDTO } from "@publishers/dto";
import PublisherService from "@publishers/publisher.service";

@Dependencies(PublisherService)
@Controller("/api/publishers", jwtMiddleware())
class PublisherController {
  constructor(private publisherService: PublisherService) {}

  @Get()
  getAll(@Query() query) {
    return this.publisherService.getAllPublisher(query);
  }

  @Post()
  @Middlewares(validateBody(PublisherCreateDTO))
  create(@Body() body) {
    return this.publisherService.createPublisher(body);
  }

  @Get("/:id")
  getOne(@Param("id") id) {
    return this.publisherService.getPublisherById(id);
  }

  @Patch("/:id")
  @Middlewares(validateBody(PublisherCreateDTO))
  update(@Param("id") id, @Body() body) {
    return this.publisherService.updatePublisherById(body, id);
  }
}

export default PublisherController;
