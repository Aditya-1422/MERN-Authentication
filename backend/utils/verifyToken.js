import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    
    if(!token) return next(errorHandler(401,"Token is not valid!!!"))

    jwt.verify(token,process.env.SEC, (error, user)=>{
        if(error) next(error(403,"Token is not valid"))

        req.user = user;
        next();
    })
}