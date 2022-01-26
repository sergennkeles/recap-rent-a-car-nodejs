const customer = require("../models/Customer");

const get = (where) => {
  return customer.find(where || {}).populate({
    path: "userId",
    select: "firstName, lastName, email",
  });
};

const add = (data) => {
  const customerModel = new customer(data); // yeni bir model örneği oluştur ve body'den gelen dataya göre doldur
  return customerModel.save();
};

const modify = (id, data) => {
  return customer.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return customer.findByIdAndRemove(id);
};

const findById = (id) => {
  return customer.findById(id).populate({
    path: "userId",
    select: "firstName, lastName, email",
  });
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findById,
};
