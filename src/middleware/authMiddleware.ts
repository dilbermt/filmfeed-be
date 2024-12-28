import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export const authMiddleware = async (req:Request,res:Response, next: NextFunction)=>{
    const access_token = req.cookies?.access_token
    console.log("access_token",access_token)
    if(!access_token){
        res.status(401).json({message:"Token not found"})
    }
    console.log("access_token_cookie",access_token)
    const token_decoded  = jwt.verify(access_token,process.env.JWT_SECRET as string) as JwtPayload
    if(token_decoded.exp && token_decoded.exp < Date.now()){
        res.status(401).json({message:"Token expired"})
    }
    // req.user
    next()
}