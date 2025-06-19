const express = require("express")
const connectDB = require("./configs/database")
const User = require("./models/user");
const cookieParser = require('cookie-parser')
const { authRouter } = require("./routes/auth");
const { requestRouter } = require("./routes/request")
const { profileRouter } = require("./routes/profile")
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);


app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.emailId;
        const user = await User.findOne({ emailId: userEmail });
        console.log(user);
        if (!user) {
            return res.status(404).send("User Not Found");
        }
        res.send(user);
    } catch (err) {
        res.status(500).send("Something Went Wrong");
    }
});
app.get("/userByID", async (req,res) =>{
    try {
        const userID = req.body._id
        const user = await User.findById({_id : userID})
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

});

app.patch("/user/:userID", async (req, res) => {

    try {
        const userID = req.params.userID;
        const data = req.body;

        const ALLOWED_UPDATES = new Set(["about", "gender", "age", "avatar", "skills"]);
        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.has(k));
        if (!isUpdateAllowed) {
            return res.status(400).send("Update not allowed");
        }
        const userUpdated = await User.findByIdAndUpdate(userID, data,
            {
                returnDocument:'after',
                runValidators:true,
            }
        );
        if (!userUpdated) {
            return res.status(404).send("User Not Found");
        }

        res.send({ message: "User updated successfully", user: userUpdated });
    } catch (err) {
        res.status(500).send("Something went wrong: " + err.message);
    }
});

app.delete("/user", async (req, res) => {

    try {
        const userID = req.body.userID;
        const userDeleted = await User.findByIdAndDelete(userID);

        if (!userDeleted) {
            return res.status(404).send("User Not Found");
        }

        res.send(userDeleted);
    } catch (err) {
        res.status(500).send("Something went wrong: " + err.message);
    }
});

connectDB()
.then(()=>{
    console.log("Database conenction established")
    app.listen(PORT, ()=>{
    console.log(`Server is Listining on ${PORT}`)
})
}).catch(()=>{
    console.error("Database can't be connected")
})