const Branch = require("../models/branch");

const postBranch = async (req, res) => {
  try {
    // Check branch
    const foundedBranch = await Branch.findOne({ code: req.body.code });
    if (foundedBranch) {
      return res.status(400).send({ message: "Branch already exists" });
    }

    const newBranch = new Branch({
      name: req.body.name,
      hotline: req.body.hotline,
      address: req.body.address,
      code: req.body.code,
    });
    const result = await newBranch.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { code } = req.query;
    const foundedBranch = await Branch.findOne({
      code,
    });
    if (!foundedBranch)
      return res.status(404).send({ message: "Branch not founded!" });
    if (foundedBranch.status === "active")
      return res
        .status(400)
        .send({ message: "Branch is still active! Can't delete!" });
    const result = await Branch.findOneAndDelete({ code });
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getBranch = async (req, res) => {
  try {
    const { id } = req.query;
    const foundedBranch = await Branch.findById(id);
    if (!foundedBranch)
      return res.status(404).send({ message: "Branch not founded!" });

    res.send(foundedBranch);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getAllBranch = async (req, res) => {
  try {
    const listBranch = await Branch.find();

    res.send(listBranch);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  postBranch,
  deleteBranch,
  getBranch,
  getAllBranch,
};
