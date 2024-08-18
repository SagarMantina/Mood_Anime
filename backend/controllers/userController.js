const express = require('express');

const path = require('path');
const User = require('../models/userModel');

const getLogin = async (req,res) => {
    
    try {
        const {username,password} = req.body;


         if(!username || !password){
            return res.status(400).json({ error: "Please fill all the fields" });
        }

         const user = await User.findOne({username});

         if(user.password=== password)
         {
            res.cookie('username', user.username);
            res.cookie('user_id', user._id);
            return res.status(200).json({ message: "Login successful" });
         }
        else{
            return res.status(404).json({ error: "Incorrect Password" });
        }
     } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
     }
}


const getSignup = async (req,res) =>{
    try {
        const {username,email,password} = req.body;


        const emailRegex = /^[^\s@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }


        if(!username || !email || !password){
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        let existUser= await User.findOne({email});
        if(!existUser){
            return res.status(400).json({ error: "User not found" });
        }
        existUser = await User.findOne({username});
        if(!existUser){
            return res.status(400).json({ error: "User not found" });
        }
         
        const newUser= new User({username,email,password});
        await newUser.save();

     } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
     }
}



const getLogout = async (req,res) =>{
    try{
       res.clearCookie("username");
       res.clearCookie("user_id");

       res.status(200).json({message:"Logged Out Successfully"});
    }
    catch (error) {
        console.error(error);
         return res.status(500).json({ error: "Internal Server Error" });
    }
}






module.exports = ({getLogin, getSignup, getLogout});