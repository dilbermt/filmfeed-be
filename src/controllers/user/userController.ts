import { Request, Response } from "express";

class UserController {
  public async whoAmI(req: Request, res: Response) {
    console.log("user -->>",req.user)
    res.status(200).json({ message: req.user });
  }
}

export default new UserController();
