const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    modelYear: String,
    dailyPrice: Number,
    description: String,
    brandId: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },
    colorId: {
      type: mongoose.Types.ObjectId,
      ref: "color",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("car", CarSchema);
