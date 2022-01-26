const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    companyName: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("customer", CustomerSchema);
