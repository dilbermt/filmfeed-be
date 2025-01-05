import { Router } from "express";
import movieController from "../controllers/movie/movieController";

const router = Router();
router.get("/", movieController.getMovies);
router.get("/:movieId", movieController.getMovie);
// todo - search route
export default router;
