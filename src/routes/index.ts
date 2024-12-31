import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import movieRoutes from "./movieRoutes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/movies", authMiddleware, movieRoutes);

export default router;
