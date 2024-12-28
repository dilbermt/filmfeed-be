import { Request, Response } from "express";

class UserController{
    public async whoAmI(req:Request,res:Response){
        res.status(200).json({message:"who am i"})
    }
}

export default new UserController()