const validation = require("validator");


const validateSignupData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName ){
        throw new Error("Please Enter a valid Name");
    } else if(!validation.isEmail(emailId)){
        throw new Error("Email Address in not valid");
    } else if(!validation.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
}

module.exports = {
    validateSignupData
}