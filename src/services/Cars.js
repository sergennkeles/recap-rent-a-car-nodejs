const car = require("../models/Car");
const BaseService = require("./BaseService");

class CarService extends BaseService {
  constructor() {
    super(car);
  }

  getAll(where) {
    return car.find(where || {}).populate([
      {
        path: "brandId",
        select: "brandName",
      },
      {
        path: "colorId",
        select: "colorName",
      },
    ]);
  }

  findById(id) {
    return car.findById(id).populate([
      {
        path: "brandId",
        select: "brandName",
      },
      {
        path: "colorId",
        select: "colorName",
      },
    ]);
  }
}

module.exports = new CarService();
