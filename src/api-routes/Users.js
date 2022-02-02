const express = require("express");
const { create, list, update, deleted, getById, login, resetPassword, changePassword } = require("../controllers/Users");
const validate = require("../middlewares/Validate");
const authenticateToken = require("../middlewares/Authenticate");
const schema = require("../validations/Users");
const router = express.Router();

router.route("/").post(validate(schema.createValidation), create);
router.route("/login").post(authenticateToken, validate(schema.loginValidation), login);
router.route("/reset-password").post(validate(schema.passwordValidation), resetPassword);
router.route("/change-password").post(authenticateToken,validate(schema.changePasswordValidation), changePassword);

router.route("/").patch(authenticateToken, validate(schema.updateValidation), update);

router.route("/:id").delete(authenticateToken, deleted);

router.route("/").get(authenticateToken, list);
router.route("/:id").get(authenticateToken, getById);

module.exports = router;
