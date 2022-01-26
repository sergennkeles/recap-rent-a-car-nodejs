const car = require("../models/Car");

const get = (where) => {
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
};

const add = (data) => {
  const carModel = new car(data); // yeni bir model örneği oluştur ve body'den gelen dataya göre doldur
  return carModel.save();
};

const modify = (id, data) => {
  return car.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return car.findByIdAndRemove(id);
};

const findById = (id) => {
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
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findById,
};
