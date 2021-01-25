const express = require("express");
const router = express.Router();
const { auth } = require("../Helpers/auth");
const {
  postBookingTrip,
  deleteTrip,
  getTrip,
  postTrip,
} = require("../controllers/trip");
const Trip = require("../models/trip");

router.post("/trip", auth(["admin"]), postTrip);

router.get("/trip", auth(), getTrip);

router.delete("/trip", auth(["admin"]), deleteTrip);

router.post("/trip/booking", auth(), postBookingTrip);

router.get("/all-trip", async (req, res) => {
  const trips = await Trip.find();
  res.send(trips);
});

module.exports = router;
