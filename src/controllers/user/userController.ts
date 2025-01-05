import { Request, Response } from "express";
import LikedMovie from "../../models/likedMovie";

class UserController {
  public async whoAmI(req: Request, res: Response) {
    console.log("user -->>", req.user);
    res.status(200).json({ message: req.user });
  }

  public async likeOrDislike(
    req: Request<{}, {}, { movieId: String }>,
    res: Response
  ) {
    const movieId = req.body.movieId;
    const userId = req.user?._id;
    console.log("movie Id and userId", movieId, " and ", userId);
    try {
      const likeRecord = await LikedMovie.find({
        movieId: movieId,
        userId: userId,
      });

      console.log("liked movie", likeRecord);
      const likedMovie = likeRecord[0];
      if (likedMovie) {
        console.log("already liked. Hence dislike movie");
        const deleteResponse = await LikedMovie.deleteOne({
          _id: likedMovie._id,
        });
        if (deleteResponse.acknowledged) {
          res.status(200).json({ message: "Dislike successful" });
        } else {
          res.status(400).json({ message: "Failed to dislike movie" });
        }
      } else {
        console.log("not liked. Hence add a like to the movie");
        const movieLike = new LikedMovie({ userId: userId, movieId: movieId });
        const writeResponse = await movieLike.save();
        if (writeResponse._id) {
          res.status(200).json({ message: "Like successful" });
        } else {
          res.status(400).json({ message: "Like failed" });
        }
      }
    } catch (error) {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
}

export default new UserController();
