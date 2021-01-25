const express = require("express");
const router = express.Router();

const { auth } = require("../Helpers/auth");
const {
  getMe,
  postSignin,
  postSignupAdmin,
  postSignup,
  postLogout,
} = require("../controllers/auth");

router.post("/signup", postSignup);

router.post("/signupAdmin", postSignupAdmin);

router.post("/signin", postSignin);

router.get("/me", auth(), getMe);

router.post("/logout", auth(), postLogout);

module.exports = router;
