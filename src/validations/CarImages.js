const joi = require("joi");

const createValidation = joi.object({
  carId: joi.string().required().min(3),
});

const updateValidation = joi.object({
  carId: joi.string().min(3),
});

module.exports = {
  createValidation,
  updateValidation,
};
 