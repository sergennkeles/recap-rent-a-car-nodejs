const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema(
  {
    rentDate: Date,
    returnDate: Date,
    carId: {
      type: mongoose.Types.ObjectId,
      ref: "car",
    },
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "customer",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("rental", RentalSchema);
