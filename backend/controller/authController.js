import User from "../models/User.js"
import bcrypt from 'bcrypt'

export const register = async (req,res) => {
    const {username,email,password} = req.body
    try {
        const hashedPassword = bcrypt.hashSync(password,10)
        const newUser = User({username,email,password:hashedPassword})
        await newUser.save()
        return res.status(201).json({message:"User is registered successfully!!!"})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}