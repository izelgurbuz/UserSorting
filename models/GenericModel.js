const mongoose = require("mongoose");
const Pace = require("./Pace");

const GenericSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  age: Number,
  userid: Number,
  distance: Number,
  total_time: Number,
});

module.exports = mongoose.model("GenericModel", GenericSchema, "users");
