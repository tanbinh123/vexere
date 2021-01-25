const mongoose = require("mongoose");
const { seatSchema } = require("./seat");

const tripSchema = new mongoose.Schema(
  {
    departurePlace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
    },
    arrivalPlace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
    },
    startedDate: Date,
    departureDate: Date,
    seats: [seatSchema],
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    price: Number,
    status: {
      type: String,
      default: "inactive",
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
