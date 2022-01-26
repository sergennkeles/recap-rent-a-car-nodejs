const joi = require("joi");

const createValidation = joi.object({
  brandId: joi.string().required().min(8),
  colorId: joi.string().required().min(8),
  modelYear: joi.string().required().min(4),
  dailyPrice: joi.number().required().min(0).max(999999),
  description: joi.string().required().min(3),
});

const updateValidation = joi.object({
  brandId: joi.string().min(8),
  colorId: joi.string().min(8),
  modelYear: joi.string(),
  dailyPrice: joi.number().min(0).max(999999),
  description: joi.string().min(3),
});

module.exports = {
  createValidation,
  updateValidation,
};
