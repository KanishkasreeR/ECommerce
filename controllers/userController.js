const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const exists = await User.findOne({email})
        if(exists){
            res.status(400).json({message:"user already exists"})
        }
        else{
            const newuser = new User({
                name,
                email,
                password
            })
            await newuser.save();
            res.status(200).send({msg:"User created successfully"})
        }
    }
    catch(error){
        res.status(500).send({msg:'Internal error',error})
        console.log(error);
    }
}
const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const exists = await User.findOne({email});
        if(!exists){
            res.status(404).json({message:"user not found"});
        }
        else{

            const valid = await bcrypt.compare(password,exists.password);
            if(!valid){
                res.status(400).json({message:"Invalid Password"});
            }
            const token = jwt.sign({userid : exists._id},"secret_key",{expiresIn:"1h"})
            res.json({token});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}
module.exports = {register,login}