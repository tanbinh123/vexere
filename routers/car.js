const express = require("express");
const router = express.Router();
const { auth } = require("../Helpers/auth");
const { postCar, putCar, deleteCar } = require("../controllers/car");

router.post("/car", postCar);

router.put("/car", auth(["admin"]), putCar);

router.delete("/car", auth(["admin"]), deleteCar);

module.exports = router;
