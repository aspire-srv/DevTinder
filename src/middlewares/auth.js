const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            throw new Error("Token is not Valid");
        }
        const decodedData = await jwt.verify(token, "devTinder@76")

        const { _id } = decodedData;

        const user = await User.findById(_id)

        req.user = user
        next()
    } catch (err) {
        res.status(400).send("Error " + err.message)
    }
}

module.exports = { userAuth }