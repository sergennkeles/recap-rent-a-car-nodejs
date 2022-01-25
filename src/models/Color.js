const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
  {
    colorName: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("color", ColorSchema);
