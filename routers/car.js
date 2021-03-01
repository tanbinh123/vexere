const express = require("express");
const router = express.Router();
const { auth } = require("../Helpers/auth");
const {
  postCar,
  putCar,
  deleteCar,
  getAllCar,
  getCar,
} = require("../controllers/car");

router.post("/car", auth(["admin"]), postCar);

router.put("/car", auth(["admin"]), putCar);

router.delete("/car", auth(["admin"]), deleteCar);

router.get("/all-car", getAllCar);

router.get("/car", getCar);

module.exports = router;
