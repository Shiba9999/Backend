require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/register", (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!(firstname, lastname, email, password)) {
    res.status(400).send("please fill all the fields");
  }
  const existingUser = User.findOne({ email });
  if (existingUser) {
    res.status(400).send("email already exists");
  }
});

module.exports = app;
