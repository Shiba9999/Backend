const express=require("express");
const app=express();
let PORT="5501";
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
}
);

app.use(express.json());

// let user={};

// app.get("/user",(req,res)=>{
//     res.send(user);
 
// });
// app.post("/user",(req,res)=>{
//     user=req.body;
//     console.log(user);
//     res.send(`added${user}`);
// });
// app.patch("/user",(req,res)=>{
//    let obj=req.body;
//    for(let key in obj){
//        user[key]=obj[key];
//    }
//    console.log(user);
//    res.send("patched");

// });
// app.delete("/user",(req,res)=>{
//     user={};
//     res.send("deleted");
    
// });

// app.get("/user/:id",(req,res)=>{
//     console.log(req.params);
//     res.send(req.params);

// })


//mounting in express
let user={};
const userRouter=express.Router();
const authRouter=express.Router();
app.use("/auth",authRouter);
app.use("/user",userRouter);
userRouter.route("/")
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);
// userRouter.route("/:id")
// .get(getUserById)

//redirect
app.get("/user-all",(req,res)=>{
    res.redirect("/user");
})

//404 page
app.use((req,res)=>{
    res.sendFile("./404.html",{root:__dirname});
})




function getUser(req,res) {
    res.send(user);
}
function createUser(req,res) {
    user=req.body;
    console.log(user);
    res.send(`added${user}`);
}
function updateUser(req,res) {
    let obj=req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    console.log(user);
    res.send("patched");
}
function deleteUser(req,res) {
    user={};
    res.send("deleted");
}
function getUserById(req,res) {
    console.log(req.params);
    res.send(req.params);
}

authRouter
.route("/signup")
.post(signupUser);

function signupUser(req,res) {
    console.log(req.body);
   
    let userDetails=req.body;
    let name=userDetails.name;
    let email=userDetails.email;
    let password=userDetails.password;
    res.json({
        message:"signedup",
        user:req.body,
    })

} 