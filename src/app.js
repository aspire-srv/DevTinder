const express = require("express")
const connectDB = require("./configs/database")
const User = require("./models/user")
const {adminAuth, userAuth} = require("./middlewares/auth")
const app = express();
const PORT = 5000;

app.use(express.json());

app.post("/signup", async (req , res)=>{  
 try{
    const user = new User(req.body);
    await user.save() 
    res.send("user data Saved")
 } catch(err){
     res.status(400).send("Invalid Request", err.message)
 }
})

app.get("/user", async (req,res) =>{
    try {
        const user = await User.find({emailId : req.body.emailId})
        if(user.length === 0){
            res.send("User Not Found");
        }
        res.send(user)
    } catch (err) {
        res.status(500).send("Something Went Wrong")
    }
})

// feed api- get all user
app.get("/feed",async (req,res)=>{

    try{
    const users = await User.find({});
        res.send(users)
    } catch(err){
        res.status(404).send("users Not found")
    }

})

connectDB()
.then(()=>{
    console.log("Database conenction established")
    app.listen(PORT, ()=>{
    console.log(`Server is Listining on ${PORT}`)
})
}).catch(()=>{
    console.error("Database can't be conencted")
})