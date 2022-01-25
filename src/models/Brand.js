const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    brandName: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("brand", BrandSchema);
