const user = require("../models/User");

const get = () => {
  return user.find({});
};

const add = (data) => {
  const userModel = new user(data); // yeni bir model örneği oluştur ve body'den gelen dataya göre doldur
  return userModel.save();
};

const modify = (where, data) => {
  return user.findOneAndUpdate(where, data, { new: true });
};

const remove = (id) => {
  return user.findByIdAndRemove(id);
};

const findOne = (where) => {
  return user.findOne(where);
};

const userLogin = (loginData) => {
  return user.findOne(loginData);
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findOne,
  userLogin,
};
