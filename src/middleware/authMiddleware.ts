import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const access_token = req.cookies?.access_token;
  console.log("access_token", access_token);
  if (!access_token) {
    res.status(401).json({ message: "Token not found" });
  } else {
    console.log("access_token_cookie", access_token);
    try {
      const token_decoded = jwt.verify(
        access_token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      if (token_decoded.exp && token_decoded.exp * 1000 < Date.now()) {
        console.log("toxen expiry time -->>", token_decoded.exp);
        console.log("current timestamp -->>", Date.now());
        console.log("token expired");
        res.status(401).json({ message: "Token expired" });
      } else {
        let user = await User.findById(token_decoded.id);
        if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          req.user = {
            _id: token_decoded.id,
            username: token_decoded.username,
            email: token_decoded.email,
          };
          next();
        }
      }
    } catch (error: any) {
      if (error?.name === "TokenExpiredError") {
        res.status(401).json({ message: "Access Token Expired" });
      } else {
        res.status(400).json(error);
      }
    }
  }
};
