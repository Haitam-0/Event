const asyncHandler = require("express-async-handler");
const User =require('../models/userModel')
const jwt = require("jsonwebtoken")
const bcrypt =require("bcrypt")

// @desc register user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req,res,next)=>{
    const {username,email,password}=req.body;

    
    if(!username || !email || !password){
        res.status(400) ; 
        return next(new Error("all fields are required"));
    }
    const userAvailable = await User.findOne({email}) ; 
    if(userAvailable){
        res.status(400);
        return next(new Error("email already taken"))
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10) ; 
    console.log("the hashed password is :" , hashedPassword)

    const newUser = await User.create({
        username,
        email,
        password:hashedPassword
    })
    if(newUser){
        res.status(201).json({_id:newUser.id , email:newUser.email})
    }else{
        res.status(400)
        return next(new Error("user data not valid"))
    }
 });


 
// @desc login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req,res,next)=>{
    const {email,password} = req.body ;
    
    if(!email || !password){
        res.status(400);
        return next(new Error("kain chi mochkil "))
    }

    const user = await User.findOne({ email });

    // compare passwrods
    if(user && (await bcrypt.compare(password , user.password))) {
        const accessToken = jwt.sign(
            {
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                },
            },process.env.ACESS_TOKEN_SECRET,
            {expiresIn:"5m"}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        return next(new Error("email or password incorrect "))
        }
 });


 
// @desc current user
// @route GET/api/users/current
// @access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message:"current user information"})
 });


 module.exports = {registerUser,loginUser,currentUser}