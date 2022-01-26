const joi = require("joi");

const createValidation = joi.object({
  carId: joi.string().required().min(8),
  customerId: joi.string().required().min(8),
  rentDate: joi.date().required(),
  returnDate: joi.date().required(),
});

const updateValidation = joi.object({
  carId: joi.string().min(8),
  customerId: joi.string().min(8),
  rentDate: joi.date(),
  returnDate: joi.date(),
});

module.exports = {
  createValidation,
  updateValidation,
};
