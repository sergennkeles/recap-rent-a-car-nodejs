const joi = require("joi");

const createValidation = joi.object({
  userId: joi.string().required().min(8),
  companyName: joi.string().required().min(3),
});

const updateValidation = joi.object({
  userId: joi.string().min(8),
  companyName: joi.string().min(3),
});

module.exports = {
  createValidation,
  updateValidation,
};
