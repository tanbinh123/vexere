const User = require("../models/user");
const bcrypt = require("bcryptjs");

const config = require("config");
// cái sendGrid mày là để gửi email cho user
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const sgAPIKey = config.get("sgAPIKey");
const jwtSignature = config.get("jwtSignature");

sgMail.setApiKey(sgAPIKey);

const postSignup = async (req, res) => {
  const { username, password, email, phone } = req.body;
  try {
    const foundedUser = await User.findOne().or([{ username }, { email }]);
    if (foundedUser)
      return res.status(400).send({ message: "User already existed" });

    const newUser = new User({
      username,
      password,
      email,
      phone,
      role: "user",
    });
    let result = await newUser.save();
    // xóa password trc khi trả về cho frondend
    result = result.toObject();
    delete result.password;

    // send email welcome
    sgMail
      .send({
        from: "hieu@covergo.com",
        to: result.email,
        subject: "Welcome",
        text: "hi there",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

const postSignupAdmin = async (req, res) => {
  const { username, password, email, phone } = req.body;
  try {
    const foundedUser = await User.findOne().or([{ username }, { email }]);
    if (foundedUser)
      return res.status(400).send({ message: "User already existed" });

    const newUser = new User({
      username,
      password,
      email,
      phone,
      role: "admin",
    });
    let result = await newUser.save();
    // xóa password trc khi trả về cho frondend
    result = result.toObject();
    delete result.password;

    // send email welcome
    sgMail
      .send({
        from: "hieu@covergo.com",
        to: result.email,
        subject: "Welcome",
        text: "hi there",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Backend sucks" });
  }
};

const postSignin = async (req, res) => {
  const { username, password } = req.body;
  try {
    //check username
    const foundedUser = await User.findOne({ username });
    if (!foundedUser)
      return res.status(401).send({ message: "Tài khoản không đúng" });

    //check password
    const isMatch = await bcrypt.compare(password, foundedUser.password);
    if (!isMatch)
      return res.status(401).send({ message: "Mật khẩu không đúng" });

    // generate token
    const token = await jwt.sign(
      {
        _id: foundedUser._id,
      },
      jwtSignature
    );
    foundedUser.tokens.push(token);
    await foundedUser.save();

    // send result

    // const result = foundedUser.toObject();
    // delete result.password;

    // send token về cho frondend
    res.send(token);
  } catch (error) {}
};

const getMe = async (req, res) => {
  // req.user đã đc tạo ở hàm auth trc đó nếu người dùng hợp lệ và hàm toJSON đã được tạo bên trong modal User khi newUser
  const result = req.user.toJSON();
  res.send(result);
};

const postLogout = async (req, res) => {
  const index = req.user.tokens.findIndex((token) => token === req.token);
  req.user.tokens.splice(index, 1);
  await req.user.save();
  res.send();
};

module.exports = {
  postSignup,
  postSignupAdmin,
  postSignin,
  getMe,
  postLogout,
};
