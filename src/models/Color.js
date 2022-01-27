const mongoose = require("mongoose");
const logger = require("../scripts/loggers/Colors");

const ColorSchema = new mongoose.Schema(
  {
    colorName: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
ColorSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});

module.exports = mongoose.model("color", ColorSchema);
