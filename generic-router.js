const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("./models/GenericModel");

router.get("/", async (req, res) => {
  try {
    const records = await Users.aggregate([
      {
        $lookup: {
          from: "pace",
          localField: "userid",
          foreignField: "userid",
          as: "pace",
        },
      },
    ]);
    res.json(records);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
