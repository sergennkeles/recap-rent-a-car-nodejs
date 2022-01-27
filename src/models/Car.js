const mongoose = require("mongoose");
const logger = require("../scripts/loggers/Cars");

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

CarSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});
module.exports = mongoose.model("car", CarSchema);
