const asyncHandler = require("express-async-handler") ; 
const jwt = require("jsonwebtoken") ; 

const validateToken = asyncHandler(async (req,res,next)=>{
    let token ;
    let autHeader = req.headers.authorization ||  req.headers.Authorization ;
    if(autHeader && autHeader.startsWith("Bearer")){
        token = autHeader.split(" ")[1] ; 
        jwt.verify(token,process.env.ACESS_TOKEN_SECRET ,(err,decoded) =>{
            if(err){
                res.status(401);
                return next(new Error("not authorized "))
            }
            console.log(decoded)
            req.user = decoded.user ; 
            next()
        });
    }
})

module.exports = validateToken