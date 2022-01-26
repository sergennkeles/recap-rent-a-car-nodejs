const express = require("express");
const { create, list, update, deleted, getById } = require("../controllers/Customers");
const validate = require("../middlewares/Validate");
const schema = require("../validations/Customers");
const router = express.Router();

router.route("/").post(validate(schema.createValidation),create);
router.route("/").get(list);
router.route("/:id").patch(validate(schema.updateValidation),update);
router.route("/:id").delete(deleted);
router.route("/:id").get(getById);

module.exports = router;
