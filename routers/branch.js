const express = require("express");
const { postBranch, deleteBranch } = require("../controllers/branch");
const { auth } = require("../Helpers/auth");

const router = express.Router();

router.post("/branch", postBranch);

router.delete("/branch", auth(["admin"]), deleteBranch);

module.exports = router;
