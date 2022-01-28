const express = require("express");
const { create, list, update, deleted, getById } = require("../controllers/Brands");
const authenticateToken = require("../middlewares/Authenticate");
const validate = require("../middlewares/Validate");
const schema = require("../validations/Brands");
const router = express.Router();

router.route("/").post(authenticateToken, validate(schema.createValidation), create);
router.route("/:id").patch(authenticateToken, validate(schema.updateValidation), update);
router.route("/").get(authenticateToken, list);
router.route("/:id").delete(authenticateToken, deleted);
router.route("/:id").get(authenticateToken, getById);

module.exports = router;
