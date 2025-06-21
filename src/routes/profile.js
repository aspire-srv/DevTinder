const express = require("express");
const {userAuth} = require("../middlewares/auth");
const bcrypt = require('bcrypt');
const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async (req, res)=>{
    
   try {    
        const user = req.user
        res.send(user);
    } catch(err){
     res.status(400).send("Error: " + err.message)
 }
})

profileRouter.patch("/profile/edit", userAuth, async (req,res) =>{

   try {
    const loggedInUser = req.user;
    const updateBody = req.body

    const allowedUpdates = ["age","gender","skills", "about", "avatar",]

    const isUpdateAllowed = Object.keys(updateBody).every(field => allowedUpdates.includes(field));
    if(isUpdateAllowed){
        Object.keys(updateBody).forEach(field => {
            loggedInUser[field] = updateBody[field];
        });
        await loggedInUser.save()
        res.json({message:`Profile updated successfully`,user:loggedInUser});
    } else {
        throw new Error("Update data is invalid");
    }
} catch(err){
        res.status(400).send("Error "+err.message)
    }
})

profileRouter.post("/profile/password", userAuth, async (req, res) =>{
    try {
        const loggedInUser = req.user;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: "Old and new passwords are required." });
        }

        // Assuming user model has a method to verify password
        const isMatch = await loggedInUser.verifyPassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({ error: "Old password is incorrect." });
        }
        const passwordHash = await bcrypt.hash(newPassword, 10)
        loggedInUser.password = passwordHash;
        await loggedInUser.save();

        res.json({ message: "Password updated successfully." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

module.exports = {profileRouter}