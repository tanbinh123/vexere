const express = require("express");
const { postStation, deleteStation } = require("../controllers/station");
const { auth } = require("../Helpers/auth");
const router = express.Router();

router.post("/station", postStation);

router.delete("/station", auth(["admin"]), deleteStation);
module.exports = router;
