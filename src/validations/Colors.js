const joi = require("joi");

const createValidation = joi.object({
  colorName: joi.string().required().min(3),
});

const updateValidation = joi.object({
  colorName: joi.string().min(3),
});

module.exports = {
  createValidation,
  updateValidation,
};
