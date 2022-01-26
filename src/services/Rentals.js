const rental = require("../models/Rental");

const get = () => {
  return rental.find({});
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
  return rental.findById(id);
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findById,
};
