const brand = require("../models/Brand");

const add = (data) => {
  const brandModel = new brand(data); // yeni bir model örneği oluştur ve body'den gelen dataya göre doldur
  return brandModel.save(); 
};

module.exports = {
  add,
};
