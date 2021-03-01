const multer = require("multer");
const express = require("express");
const { auth } = require("../Helpers/auth");
const { uploadFile, uploadAvatar } = require("../controllers/upload");

const router = express.Router();

// multer là thư viện hỗ trợ xử lý hình ảnh,...
const upload = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename(req, file, done) {
      const name = Date.now() + "-" + file.originalname.replace(" ", "-");
      done(null, name);
    },
  }),
});

router.post("/upload/file", upload.single("data"), uploadFile);

router.post("/upload/avatar", auth(), upload.single("data"), uploadAvatar);

module.exports = router;
