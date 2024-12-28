import { Router } from "express";
import userController from "../controllers/user/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router()

router.get("/whoami",authMiddleware, userController.whoAmI)

export default router