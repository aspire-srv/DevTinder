

const adminAuth = (req,res,next)=>{
    const token = 'xyz';
    const isAuth = token === 'xyz'
    if(!isAuth){
        res.status(401).send("UnAuthorized");
    } else {
        next()
    }
}

const userAuth = (req,res,next) =>{
    const token = "xyz";
    const isUserAuthenticated = token === "xvyz";
    if(isUserAuthenticated){
        next()
    } else {
        res.status(401).send("unAuthorized");
    }
}

module.exports = { adminAuth, userAuth }