const mongoose = require("mongoose");
const logger = require("../scripts/loggers/Brands");

const BrandSchema = new mongoose.Schema(
  {
    brandName: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BrandSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});
module.exports = mongoose.model("brand", BrandSchema);
