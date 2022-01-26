const color = require("../models/Color");

const get = () => {
  return color.find({});
};

const add = (data) => {
  const colorModel = new color(data); // yeni bir model örneği oluştur ve body'den gelen dataya göre doldur
  return colorModel.save();
};

const modify = (id, data) => {
  return color.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return color.findByIdAndRemove(id);
};

const findById = (id) => {
  return color.findById(id);
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findById,
};
