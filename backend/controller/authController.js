import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const register = async (req,res,next) => {
    const {username,email,password} = req.body
    try {
        const user = await User.findOne({$or:[{email},{username}]})
        if(user){
            next(errorHandler(409,"User already exists!!"))
        }
        const hashedPassword = bcrypt.hashSync(password,10)
        const newUser = User({username,email,password:hashedPassword})
        await newUser.save()
        return res.status(201).json({message:"User is registered successfully!!!"})
    } catch (error) {        
        next(errorHandler(500, "Something went wrong!"));
    }
}

export const login = async (req,res,next) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) next(errorHandler(409,"User does not Exists!!!"));
        const comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword) next(errorHandler(401,"Wrong Credentials!!!"));
        const token = jwt.sign({id:user._id},process.env.SEC,)
        res.cookie("access_token",token,{httpOnly:true}).status(200).json(user)
    } catch (error) {
        next(errorHandler(500,"Something went wrong!!"))
    }
}


export const googlelogin = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email }); // Use correct query
  
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.SEC);
  
        const { password, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
  
        res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const genHashedPassword = bcrypt.hashSync(generatedPassword, 10);
        const newUser = new User({
          username: req.body.username.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
          email: req.body.email,
          password: genHashedPassword,
          profilePicture: req.body.photo,
        });
        await newUser.save();
  
        const token = jwt.sign({ id: newUser._id }, process.env.SEC);
        const { password, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
  
        res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
      }
    } catch (error) {
      next(errorHandler(500, "Something went wrong!!!"));
    }
  };