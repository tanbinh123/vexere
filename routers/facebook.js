const express = require("express");
const router = express.Router();
const passport = require("passport");
const { postLoginFacebook } = require("../controllers/facebook");

router.post(
  "/login/facebook",
  passport.authenticate("facebookToken", { session: false }),
  postLoginFacebook
);

module.exports = router;
