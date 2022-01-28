const joi = require("joi");

const createValidation = joi.object({
  firstName: joi.string().required().min(3),
  lastName: joi.string().required().min(3),
  email: joi.string().email().required().min(8),
  password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  status: joi.boolean().required(),
});

const updateValidation = joi.object({
  firstName: joi.string().min(3),
  lastName: joi.string().min(3),
  email: joi.string().email().min(8),
  password: joi.string().min(8),
  status: joi.boolean(),
});

const loginValidation = joi.object({
  email: joi.string().email().required().min(8),
  password: joi.string().required().min(8),
});
module.exports = {
  createValidation,
  updateValidation,
  loginValidation,
};
