const joi = require("joi");

const createValidation = joi.object({
  brandName: joi.string().required().min(3),
});

const updateValidation = joi.object({
  brandName: joi.string().min(3),
});

module.exports = {
  createValidation,
  updateValidation,
};
 