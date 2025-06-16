const mongoose = require("mongoose");


const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://NamasteDev:AGIFNqPdTnHloxQs@namastedev.pwwlxtd.mongodb.net/devTinder")
}

module.exports = connectDB;