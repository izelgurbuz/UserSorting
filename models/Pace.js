const mongoose = require("mongoose");

const paceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userid: Number,
  total_time: Number,
  distance: Number,
});

module.exports = mongoose.model("Pace", paceSchema);
