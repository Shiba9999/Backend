const express= require("express");
const app=express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())
let PORT="5000";
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
app.use(express.json());


app.post("/auth",(req,res)=>{
    console.log("req",req.body);
    const email=req.body.email;
    const password=req.body.password;
    res.send(req.body);
})
