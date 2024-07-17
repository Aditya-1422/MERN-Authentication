import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRouter from './router/authRouter.js'
import userRouter from './router/userRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config({path:'./backend/config.env'})
const app = express();

const connectDb = () =>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log(`Connected to DB!!`)
    }).catch((err)=>{
        err
    })
}

app.listen(process.env.PORT,()=>{
    connectDb();
    console.log(`Server is working : ${process.env.PORT}`)
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})