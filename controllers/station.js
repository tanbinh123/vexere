const Station = require("../models/station");

const postStation = async (req, res) => {
  const { name, address, code, province } = req.body;
  try {
    const foundedStation = await Station.findOne({ code });
    if (foundedStation)
      return res.status(400).send({ message: "Station existed" });
    const newStation = new Station({
      name,
      address,
      code,
      province,
    });
    const result = await newStation.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

const deleteStation = async (req, res) => {
  try {
    const { id } = req.query;
    const foundedStation = await Station.findById(id);
    if (!foundedStation)
      return res.status(404).send({ message: "Station not founded!" });
    if (foundedStation.status === "active")
      return res
        .status(400)
        .send({ message: "Station is still active! Can't delete!" });
    const result = await Station.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

const getStation = async (req, res) => {
  try {
    const { id } = req.query;

    const foundedStation = await Station.findById(id);
    if (!foundedStation)
      return res.status(400).send({ message: "Invalid station" });

    res.send(foundedStation);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

const getAllStation = async (req, res) => {
  try {
    const listStation = await Station.find();

    res.send(listStation);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

module.exports = {
  postStation,
  deleteStation,
  getStation,
  getAllStation,
};
