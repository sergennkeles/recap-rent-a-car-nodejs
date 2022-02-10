const rental = require("../models/Rental");
const BaseService = require("./BaseService");

class RentalService extends BaseService {
  constructor() {
    super(rental);
  }

  getAll(where) {
    return rental.find(where || {}).populate([
      {
        path: "carId",
        select: "modelYear",
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
      {
        path: "customerId",
        select: "companyName",
        populate: [
          {
            path: "userId",
            select: "firstName lastName",
          },
        ],
      },
    ]);
  }

  findById(id) {
    return rental.findById(id).populate([
      {
        path: "carId",
        select: "modelYear",
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
      {
        path: "customerId",
        select: "companyName",
        populate: [
          {
            path: "userId",
            select: "firstName lastName",
          },
        ],
      },
    ]);
  }
}

module.exports = new RentalService();
