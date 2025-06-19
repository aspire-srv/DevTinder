const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a Valid Email "+ value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a Strong Password"+ value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
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
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Not a Valid URL "+ value);
            }
        }
    }
},{timestamps:true});

function arrayLimit(val) {
    return val.length <= 20;
}

userSchema.methods.getJWT = async function (){
    const user = this
    const token = await jwt.sign({_id:user._id},"devTinder@76", { expiresIn: '7d' })
    return token;
}
userSchema.methods.verifyPassword = async function (passwordInputByUser){
    const user = this
    const passwordHash = user.password
    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isValidPassword;
}
module.exports = mongoose.model("User", userSchema)