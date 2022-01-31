const carImage = require("../models/CarImage");

const get = () => {
  return carImage.find({}).populate([
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
  ]);
};

const add = (data) => {
  const carImageModel = new carImage(data); // yeni bir model örneği oluştur ve body'den gelen dataya göre doldur
  return carImageModel.save();
};

const modify = (id, data) => {
  return carImage.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return carImage.findByIdAndRemove(id);
};

const findById = (id) => {
  return carImage.findById(id);
};

module.exports = {
  add,
  get,
  modify,
  remove,
  findById,
};
