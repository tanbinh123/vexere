const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    name: String,
    status: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Seat = mongoose.model("Seat", seatSchema);

module.exports = { Seat, seatSchema };
