const express = require("express");
const fileUpload=require("express-fileupload");
const app = express();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dysu0w2ll",
  api_key: "712134513141679",
  api_secret:"_Jm1rRVpzr4qYpq9iSsdouP3pcw"
});
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"./tmp/",
}));
app.listen("4000", () => {
  console.log("Running on port 4000");
});
app.get("/myget", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});
app.get("/mygetform",(req,res)=>{
  res.render("getform");
})
app.get("/mypostform",(req,res)=>{
  res.render("postform");
});
app.post("/mypost",async (req,res)=>{
  console.log(req.body);
  console.log(req.files);
  // res.send(req.body);
  let file=req.files.myfile;
  const result=await cloudinary.uploader.upload(file.tempFilePath,{
    folder:"users"
  })
  const details={
    firstname:req.body.firstname,
    password:req.body.password,
    result
  }
  res.send(details);
  console.log(result);
}
);
