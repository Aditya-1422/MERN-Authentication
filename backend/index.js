import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRouter from './router/authRouter.js'

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

app.use("/api/auth",authRouter)