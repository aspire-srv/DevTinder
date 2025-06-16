const express = require("express")
const {adminAuth, userAuth} = require("./middlewares/auth")
const app = express();
const PORT = 5000;


app.use("/admin", adminAuth)

app.get("/admin/allData", (req,res,next) =>{
        throw new Error("please contact support");
});

app.get("/user/userData",userAuth,(err,req,res,next)=>{
    res.send(
        "user data is fetched"
    )
})

app.use("/", (err,req,res,next) => {
    res.status(500).send({ error: err.message });
})



app.listen(PORT, ()=>{
    console.log(`Server is Listining on ${PORT}`)
})