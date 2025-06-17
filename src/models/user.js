const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 50
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    gender: {
        type: String,
        required: true,
        validate(v){
            if(!["male","female","others"].includes(v)){
                throw new Error("Not a Valid gender");  
            } 
        }
        // enum: {
        //     values:["male", "female","others"],
        //     message:"{VALUE} Not a valid gender"
        // } // restrict to allowed values
    },
    about: {
        type: String,
        default: "Developer/Engineer",
        maxlength: 500
    },
    skills: {
        type: [String],
        validate: [arrayLimit, '{PATH} exceeds the limit of 20']
    },
    avatar: {
        type: String,
        default: "https://www.w3schools.com/w3images/avatar6.png",
        match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/, 'Please enter a valid image URL']
    }
},{timestamps:true});

function arrayLimit(val) {
    return val.length <= 20;
}

module.exports = mongoose.model("User", userSchema)