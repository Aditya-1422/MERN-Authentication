import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { errorHandler } from "../utils/error.js"

export const register = async (req,res,next) => {
    const {username,email,password} = req.body
    try {
        const hashedPassword = bcrypt.hashSync(password,10)
        const newUser = User({username,email,password:hashedPassword})
        await newUser.save()
        return res.status(201).json({message:"User is registered successfully!!!"})
    } catch (error) {        
        next(errorHandler(500, "Something went wrong!"));
    }
}