const carImage = require("../models/CarImage");
const BaseService = require("./BaseService");
class CarImageService extends BaseService {
  constructor() {
    super(carImage);
  }

  getAll(where) {
    return carImage.find(where || {}).populate([
      {
        path: "carId",
        populate: [
          {
            path: "brandId",
            select: "brandName",
          },
          {
            path: "colorId",
            select: "colorName",
          },
        ],
      },
    ]);
  }
}

module.exports = new CarImageService();
