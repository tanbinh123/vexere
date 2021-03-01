const express = require("express");
const {
  postBranch,
  deleteBranch,
  getBranch,
  getAllBranch,
} = require("../controllers/branch");
const { auth } = require("../Helpers/auth");

const router = express.Router();

router.post("/branch", auth(["admin"]), postBranch);

router.delete("/branch", auth(["admin"]), deleteBranch);

router.get("/branch", getBranch);

router.get("/all-branch", getAllBranch);

module.exports = router;
