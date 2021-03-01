const config = require("config");
// const path = require("path");

const uploadFile = async (req, res) => {
  // res.send("http://" + path.join(req.headers.host, "image", req.file.filename));
  // res.send(
  //   "http://" + path.join(config.get("hostUrl"), "image", req.file.filename)
  // );
  res.send(`http://${config.get("hostUrl")}/image/${req.file.filename}`);
};

const uploadAvatar = async (req, res) => {
  req.user.avatar =
    // "http://" + path.join(req.headers.host, "image", req.file.filename);
    `http://${config.get("hostUrl")}/image/${req.file.filename}`;
  console.log(req.user.avatar);
  const result = await req.user.save();
  res.send(result);
};

module.exports = {
  uploadFile,
  uploadAvatar,
};
