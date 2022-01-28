const user = require("../models/User");

const get = () => {
  return user.find({});
};

const add = (data) => {
  const userModel = new user(data); // yeni bir model örneği oluştur ve body'den gelen dataya göre doldur
  return userModel.save();
};

const modify = (id, data) => {
  return user.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return user.findByIdAndRemove(id);
};

const findById = (id) => {
  return user.findById(id);
};

const userLogin = (loginData) => {
  return user.findOne(loginData);
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findById,
  userLogin,
};
