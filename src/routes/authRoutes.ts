import { Router } from "express";
import authController from "../controllers/auth/authController";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/refresh-access", authController.refreshToken);

export default router;
