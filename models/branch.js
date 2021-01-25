const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: String,
    hotline: String,
    address: String,
    code: String,
    status: {
      type: String,
      default: "inactive",
    },
  },
  { timestamps: true }
);

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
