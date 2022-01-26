const express = require("express");
const { create, list, update, deleted, getById } = require("../controllers/Customers");
const router = express.Router();

router.route("/").post(create);
router.route("/").get(list);
router.route("/:id").patch(update);
router.route("/:id").delete(deleted);
router.route("/:id").get(getById);

module.exports = router;
