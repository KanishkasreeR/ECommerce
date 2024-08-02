const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    // const token = req.header('Authorization').replace('Bearer',' ') 
    const token = req.header('Authorization').split(" ")[1];
    
    //The access token is sent in Authorization key
    //To seperate the token from bearer token [OAuth]
    //Split can also be used - split provides the string as array 
    //getting the token from req.header
    if(!token){
        return res.status(401).json({error:"Token Required"});
    }
    try{
        const decoded = jwt.verify(token,"secret_key");
        //Parameter - generated token and secret key
        req.user = decoded.userid;
        //Mapping user data to req.user [Here userid is mapped to req.user]
        next();
    }
    catch(error){
        //If the token expires,then the token is Invalid
        res.status(401).json({error:"Invalid Token"})
    }
};

module.exports = auth;