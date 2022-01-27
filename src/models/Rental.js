const mongoose = require("mongoose");
const logger = require("../scripts/loggers/Rentals");

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

RentalSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});

module.exports = mongoose.model("rental", RentalSchema);
