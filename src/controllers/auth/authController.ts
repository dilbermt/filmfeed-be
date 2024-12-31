import { Request, response, Response } from "express";
import { loginPayload, registerPayload } from "./types";
import User from "../../models/userModel";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

// export const registerController = async(req:Request,res:Response) =>{
//     console.log("request body -->>",req.body)
//     return res.status(200).json({message:"registration successful"})
// }

class AuthController {
  // register
  public async register(req: Request<{}, {}, registerPayload>, res: Response) {
    console.log("request body", req.body);
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    const response = await user.save();
    console.log("saved response", response);
    res.status(200).json({ message: "register successful" });
  }

  // login
  public async login(req: Request<{}, {}, loginPayload>, res: Response) {
    console.log("login payload", req.body);
    let user;
    try {
      user = await User.findOne({ username: req.body.username });
      console.log("user", user);
      if (user) {
        // check password
        const passwordsMatch = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (passwordsMatch) {
          const payload = {
            id: user._id,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: "1d",
          });
          const refresh = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: "30d" }
          );
          res
            .status(200)
            .cookie("access_token", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24,
            })
            .cookie("refresh_token", refresh, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 30,
            })
            .json({
              user: { username: user.username, email: user.email },
              message: "Login Successful",
            });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      } else {
        res.status(404).json({
          message: "User not found. Please check the username you entered",
        });
      }
    } catch (error) {
      console.log("error --->>>", error);
      res.status(404).json({ error });
    }
  }

  // refresh token
  public async refreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;
    console.log("refresh_token", refresh_token);
    if (!refresh_token) {
      res.status(401).json({ message: "Refresh Token not found" });
    }
    try {
      const token_decoded = jwt.verify(
        refresh_token,
        process.env.JWT_REFRESH_SECRET as string
      ) as JwtPayload;
      let user = await User.findById(token_decoded.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        const payload = {
          id: user._id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
          expiresIn: "1d",
        });
        const refresh = jwt.sign(
          payload,
          process.env.JWT_REFRESH_SECRET as string,
          { expiresIn: "30d" }
        );
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
          })
          .cookie("refresh_token", refresh, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
          })
          .json({
            message: "Refresh Successful",
          });
      }
    } catch (error: any) {
      if (error?.name === "TokenExpiredError") {
        res.status(401).json({ message: "Access Token Expired" });
      } else {
        res.status(400).json(error);
      }
    }
  }
}

export default new AuthController();
