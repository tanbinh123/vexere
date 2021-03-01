const express = require("express");
const {
  postStation,
  deleteStation,
  getStation,
  getAllStation,
} = require("../controllers/station");
const { auth } = require("../Helpers/auth");
const router = express.Router();

router.post("/station", postStation);

router.delete("/station", auth(["admin"]), deleteStation);

router.get("/station", getStation);

router.get("/all-station", getAllStation);

module.exports = router;
