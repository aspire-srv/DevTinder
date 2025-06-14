const express = require("express")

const app = express();
const PORT = 5000;

app.get("/", (req, res)=>{
   res.send("Here is dashbord")
});
app.get("/login", (req,res)=>{
    res.send("here is login page")
});
app.get("/hello", (req,res)=>{
    res.send("here is hello page")
});

app.listen(PORT, ()=>{
    console.log(`Server is Listining on ${PORT}`)
})