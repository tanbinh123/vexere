const Ticket = require("../models/ticket");
const Trip = require("../models/trip");
const Station = require("../models/station");
const Car = require("../models/car");
const { Seat } = require("../models/seat");
const mongoose = require("mongoose");

// transaction: tạo ra một chuỗi action, mà 1 trong số đó thất bại thì tự rollback lại trạng thái ban đầu

const postBookingTrip = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { tripId, seatId } = req.body;

    // kiểm tra
    const foundedTrip = await Trip.findById(tripId).session(session);
    if (!foundedTrip)
      return res
        .status(400)
        .send({ message: "invalid trip. Id is not exist!" });

    const foundedIndex = foundedTrip.seats.findIndex(
      (item) => item._id.toString() === seatId && item.status === "available"
    );

    if (foundedIndex === -1)
      return res.status(400).send({ message: "invalid seat." });

    // update seat status
    foundedTrip.seats[foundedIndex].userId = req.user._id;
    foundedTrip.seats[foundedIndex].status = "booked";
    await foundedTrip.save();

    // creat ticket
    await Ticket.create(
      [
        {
          userId: req.user._id,
          tripId: foundedTrip._id,
          seats: [foundedTrip.seats[foundedIndex]],
        },
      ],
      { session: session }
    );
    // const newTicket = new Ticket({
    //   userId: req.user._id,
    //   tripId: foundedTrip._id,
    //   seats: [foundedTrip.seats[foundedIndex]],
    // });
    // await newTicket.save();
    await session.commitTransaction();
    session.endSession();

    res.send({ message: "Successful booking!" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({ message: "Backend sucks" });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const { id } = req.query;
    const foundedTrip = await Trip.findById(id);
    if (!foundedTrip)
      return res.status(404).send({ message: "Trip not founded!" });
    if (foundedTrip.status === "active")
      return res
        .status(400)
        .send({ message: "Trip is still active! Can't delete!" });
    const result = await Trip.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

const getTrip = async (req, res) => {
  let { departurePlace, arrivalPlace, startedDate } = req.query;

  // startedDate = startedDate + " 00:00:00";
  // console.log(departurePlace, arrivalPlace, startedDate);
  try {
    const foundedTrips = await Trip.find({
      departurePlace,
      arrivalPlace,
      startedDate,
    }).populate(
      "departurePlace arrivalPlace carId",
      "name address licensePlate"
    );

    res.send(foundedTrips);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

const postTrip = async (req, res) => {
  try {
    let {
      departurePlace,
      arrivalPlace,
      startedDate,
      departureDate,
      carId,
      price,
    } = req.body;

    // set ngày về lại global time
    startedDate = startedDate + " 00:00:00";

    //check station
    const foundedStations = await Station.find().or([
      { _id: departurePlace },
      { _id: arrivalPlace },
    ]);

    if (foundedStations.length !== 2)
      return res.status(400).send({ message: "Invalid stations" });

    //check car
    const foundedCar = await Car.findById(carId);
    if (!foundedCar) return res.status(400).send({ message: "Invalid car" });

    // tạo ra mảng mới chứa n undefine phần tử. Và map, tạo seat cho từng phần tử
    const seatArr = [...new Array(foundedCar.seats)].map((_, index) => {
      return new Seat({
        name: index + 1,
        status: "available",
      });
    });

    const newTrip = new Trip({
      departurePlace,
      arrivalPlace,
      startedDate,
      departureDate,
      seats: seatArr,
      carId,
      price,
    });
    const result = await newTrip.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

module.exports = {
  postBookingTrip,
  deleteTrip,
  getTrip,
  postTrip,
};
