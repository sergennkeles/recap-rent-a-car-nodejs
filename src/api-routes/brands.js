const express = require("express");
const { create } = require("../controllers/brands");
const router = express.Router();

router.post("/", create);

module.exports = router;
