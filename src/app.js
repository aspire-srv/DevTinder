const express = require("express")

const app = express();
const PORT = 5000;

app.get("/user", (req, res) =>{
    res.send({firstName:"Taniya", lastName:"Mittal"})
})
app.post("/user", (req,res)=>{
    // save user in db
    res.send("user saved successfully")
});
app.patch("/user", (req,res)=>{
    res.send("user updated successfully")
})
app.delete("/user", (req,res) => {
  res.send("user deleted successfully")
})


app.use("/test", (req, res)=>{
   res.send("Here is dashbord")
});

app.listen(PORT, ()=>{
    console.log(`Server is Listining on ${PORT}`)
})