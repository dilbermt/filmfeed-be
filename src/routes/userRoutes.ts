import { Router } from "express";
import userController from "../controllers/user/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/whoami", authMiddleware, userController.whoAmI);
// todo - like and dislike a movie
router.post("/movie-like", authMiddleware, userController.likeOrDislike);
// todo - rate and review a movie

// todo - add a movie to watchlist

export default router;
