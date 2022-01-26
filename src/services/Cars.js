const car = require("../models/Car");

const get = () => {
  return car.find({});
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
  return car.findById(id);
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findById,
};
