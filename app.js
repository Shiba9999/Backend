require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!(firstname && lastname && email && password)) {
      res.status(400).send("please fill all the fields");
    }
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      
      res.status(400).send("email already exists");
    }
    const myEncPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: myEncPassword,
    });

    //token generation
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30h",
      }
    );

    user.token = token;
    //password handle
    // user.password = undefined;
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
});
app.post("/login",async(req,res)=>{
  const {email,password} = req.body;
  const existingUser= await User.findOne({email});
  if(!existingUser){
    res.status(400).send("email does not exist");
  }
  const isMatch = await bcrypt.compare(password,existingUser.password);
  if(!isMatch){
    res.status(400).send("password is incorrect");
  }
  //token generation
  const token = jwt.sign(
    {
      user_id: existingUser._id,
      email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "30h",
    }
  );
  existingUser.token = token;
  //password handle
  // existingUser.password = undefined;
  res.status(200).send(existingUser);
  res.send("login success");

})



module.exports = app;
