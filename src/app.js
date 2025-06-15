const express = require("express")
const {adminAuth, userAuth} = require("./middlewares/auth")
const app = express();
const PORT = 5000;


app.use("/admin", adminAuth)

app.get("/admin/allData", (req, res, next) =>{
    res.send("All Data is Fetched")
});

app.get("/user/userData",userAuth,(req,res)=>{
    res.send(
        "user data is fetched"
    )
})




app.listen(PORT, ()=>{
    console.log(`Server is Listining on ${PORT}`)
})