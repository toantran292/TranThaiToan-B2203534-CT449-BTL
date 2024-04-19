import { Injectable } from "@decorators";
import { PublisherCreateDTO } from "@publishers/dto";
import { PublisherModel } from "@publishers/publisher.model";
import { getFilterManyField } from "@root/utils/filter.util";

@Injectable()
class PublisherService {
  getAllPublisher(query) {
    let filter = getFilterManyField(["name", "address"], query);
    return PublisherModel.find(filter);
  }
  getPublisherById(id: string) {
    return PublisherModel.findById(id);
  }
  updatePublisherById(data: PublisherCreateDTO, id: string) {
    const filter = { _id: id };
    const updateOperation = { $set: data };
    const updateOptions = { new: true };
    return PublisherModel.findOneAndUpdate(
      filter,
      updateOperation,
      updateOptions,
    );
  }

  async createPublisher(data: PublisherCreateDTO) {
    const newPublisher = new PublisherModel(data);
    await newPublisher.save();
    return newPublisher;
  }
}

export default PublisherService;
