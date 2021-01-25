const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    code: String,
    province: String,
    status: {
      type: String,
      default: "inactive",
    },
  },
  { timestamps: true }
);

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;
