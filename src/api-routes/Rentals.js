const express = require("express");
const { create, list, update, deleted, getById } = require("../controllers/Rentals");
const validate = require("../middlewares/Validate");
const authenticateToken = require("../middlewares/Authenticate");
const schema = require("../validations/Rentals");
const router = express.Router();

router.route("/").post(authenticateToken, validate(schema.createValidation), create);
router.route("/").get(authenticateToken, list);
router.route("/:id").patch(authenticateToken, validate(schema.updateValidation), update);
router.route("/:id").delete(authenticateToken, deleted);
router.route("/:id").get(authenticateToken, getById);

module.exports = router;
