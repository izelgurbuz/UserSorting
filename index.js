const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");
const genericRoute = require("./generic-router");

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected!");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method == "OPTIONS") {
    res.header("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    return res.status(200).json();
  }
  next();
});

app.use("/", genericRoute);
//Error Handling
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

app.listen(5000);
