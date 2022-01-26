const rental = require("../models/Rental");

const get = (where) => {
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
};

const add = (data) => {
  const rentalModel = new rental(data); // yeni bir model örneği oluştur ve body'den gelen dataya göre doldur
  return rentalModel.save();
};

const modify = (id, data) => {
  return rental.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return rental.findByIdAndRemove(id);
};

const findById = (id) => {
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
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findById,
};
