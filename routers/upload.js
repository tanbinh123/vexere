const multer = require("multer");
const express = require("express");
const { auth } = require("../Helpers/auth");
const path = require("path");

const router = express.Router();

// multer là thư viện hỗ trợ xử lý hình ảnh,...
const upload = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename(req, file, done) {
      const name = Date.now() + "-" + file.originalname;
      done(null, name);
    },
  }),
});

router.post("/upload/file", upload.single("data"), async (req, res) => {
  console.log(path.join(req.headers.host, "image", req.file.filename));
  res.send(
    "https://" + path.join(req.headers.host, "image", req.file.filename)
  );
});

router.post(
  "/upload/avatar",
  auth(),
  upload.single("data"),
  async (req, res) => {
    const { path } = req.file;
    req.user.avatar = path;
    const result = await req.user.save();
    res.send(result);
  }
);

module.exports = router;
