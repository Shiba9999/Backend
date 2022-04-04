const jwt = require("jsonwebtoken");

 const auth = async (req, res, next) => {
  try {
      //first get token
    const token = req.cookies.token ||req.body.token ||req.header("Authorization").replace("Bearer ", "");
    //decode the value of token and get data
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    console.log(decoded);
    if(!token){
        res.send("no token");
    }
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
module.exports=auth;
