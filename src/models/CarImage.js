const mongoose = require("mongoose");


const ImageSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Types.ObjectId,
      ref: "car",
    },
    path: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("image", ImageSchema);
