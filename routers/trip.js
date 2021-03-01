const express = require("express");
const router = express.Router();
const { auth } = require("../Helpers/auth");
const {
  postBookingTrip,
  deleteTrip,
  getTrip,
  postTrip,
  getAllTrip,
} = require("../controllers/trip");

router.post("/trip", auth(["admin"]), postTrip);

router.get("/trip", getTrip);

router.delete("/trip", auth(["admin"]), deleteTrip);

router.post("/trip/booking", auth(), postBookingTrip);

router.get("/all-trip", getAllTrip);

module.exports = router;
