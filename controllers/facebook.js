const config = require("config");
const jwtSignature = config.get("jwtSignature");
const jwt = require("jsonwebtoken");

const postLoginFacebook = async (req, res) => {
  try {
    const token = await jwt.sign(
      {
        _id: req.user._id,
      },
      jwtSignature
    );
    req.user.tokens.push(token);
    await req.user.save();
    res.send(token);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postLoginFacebook,
};
