const brand = require("../models/Brand");

const get = () => {
  return brand.find({});
};

const add = (data) => {
  const brandModel = new brand(data); // yeni bir model örneği oluştur ve body'den gelen dataya göre doldur
  return brandModel.save();
};

const modify = (id, data) => {
  return brand.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return brand.findByIdAndRemove(id);
};

const findById = (id) => {
  return brand.findById(id);
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findById,
};
