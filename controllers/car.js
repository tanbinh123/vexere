const Branch = require("../models/branch");
const Car = require("../models/car");

const postCar = async (req, res) => {
  try {
    const { branchId, licensePlate, seats } = req.body;
    const foundedCar = await Car.findOne({ licensePlate });
    if (foundedCar)
      return res.status(400).send({ message: "Car already existed!!" });
    const newCar = new Car({
      branch: branchId,
      licensePlate,
      seats,
    });
    const result = await newCar.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

const putCar = async (req, res) => {
  try {
    const { carId, branchId, seats, status } = req.body;
    const foundedBranch = await Branch.findById(branchId);
    if (branchId && !foundedBranch)
      return res.status(404).send({ message: "Branch not found" });

    const foundedCar = await Car.findById(carId);
    if (!foundedCar) return res.status(404).send({ message: "Car not found" });

    foundedBranch && (foundedCar.branch = foundedBranch._id);
    seats && (foundedCar.seats = seats);
    status && (foundedCar.status = status);

    const result = await foundedCar.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.query;
    const foundedCar = await Car.findById(id);
    if (!foundedCar)
      return res.status(404).send({ message: "Car not founded!" });
    if (foundedCar.status === "active")
      return res
        .status(400)
        .send({ message: "Car is still active! Can't delete!" });
    const result = await Car.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

module.exports = {
  postCar,
  putCar,
  deleteCar,
};
