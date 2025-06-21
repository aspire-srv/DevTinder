const express = require("express");
const { validateSignupData } = require("../utils/validation.js")
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth.js");
const authRouter = express.Router();

authRouter.post("/signup", async (req ,res)=>{  
 try{

    // validate req body
    validateSignupData(req)

    // encrypt password
    const {firstName, lastname, emailId, password,dateOfBirth} = req.body;
    const passwordHash = await bcrypt.hash(password, 10)

    const inputDob = dateOfBirth; // DD-MM-YYYY from form
    const [day, month, year] = inputDob.split("-");
    const dobIso = new Date(`${day}-${month}-${year}`); // 1997-03-01
   
    const user = new User({
        firstName,
        lastname,
        emailId,
        dateOfBirth: dobIso, 
        password : passwordHash
    });
    await user.save() 
    res.send("user data Saved")
 } catch(err){
     res.status(400).send("Invalid Request " + err.message)
 }
})

authRouter.post("/login", async (req ,res)=>{  
 try{

    const { emailId, password } = req.body;

    const user = await User.findOne({emailId:emailId})
    if(!user) {
        throw new Error("Invalid Creds");
    } 
       const isValidPassword = await user.verifyPassword(password);
       if(isValidPassword){
        const token = await user.getJWT();
            res.cookie("token",token, { expires: new Date(Date.now() + 900000)})
            res.send("Login Successful!!!")
       } else {
            throw new Error("Invalid Creds");
       }

 } catch(err){
     res.status(400).send("Invalid Request " + err.message)
 }
});

authRouter.post("/logout", userAuth, (req, res) =>{
    try{
        res.cookie("token", null, {
        expires: new Date(Date.now())
    })

    res.json({message:`${req.user.firstName} you're logout successfully`, status: res.statusCode})
    } catch(err){
        res.status(400).json({ message: "Error " + err.message, status: 400 });
    }
   
})

module.exports =  { authRouter }