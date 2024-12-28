import {Request,response,Response} from "express"
import { loginPayload, registerPayload } from "./types"
import User from "../../models/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// export const registerController = async(req:Request,res:Response) =>{
//     console.log("request body -->>",req.body)
//     return res.status(200).json({message:"registration successful"})
// }

class AuthController{
    // register
    public async register(
        req:Request<{},{},registerPayload>,
        res:Response
    ){
        console.log("request body",req.body)
        const user = new User({
            email:req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        const respponse = await user.save()
        console.log("saved response",response)
        res.status(200).json({message:"register successful"})
    }

    // login
    public async login(
        req:Request<{},{},loginPayload>,
        res:Response
    ){
        console.log("login payload",req.body)
        let user;
        try {
            user = await User.findOne({username:req.body.username})
            console.log("user",user)
            if(user){
                // check password
                const passwordsMatch = bcrypt.compareSync(req.body.password,user.password)
                if(passwordsMatch){
                    const payload = {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                    const token = jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:"1d"})
                    res.status(200).cookie("access_token",token,{httpOnly:true,maxAge:1000*60*60*24}).json({user:{username:user.username,email:user.email},message:"Login Successful"})
                }else{
                    res.status(401).json({message:"Incorrect password"})
                }
            }else{
                res.status(404).json({message:"User not found. Please check the username you entered"})
            }
        } catch (error) {
            console.log("error --->>>",error)
            res.status(404).json({error})
        }
    }
}

export default new AuthController() 