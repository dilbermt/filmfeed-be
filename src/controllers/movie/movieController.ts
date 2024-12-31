import { Request, Response } from "express";
import Movie from "../../models/movieModel";
import mongoose from "mongoose";

class MovieContrtoller {
  // get movies for dashboard
  public async getMovies(req: Request, res: Response) {
    let page = Number(req.query?.page);
    let items = Number(req.query?.items);
    console.log("page -->>", page);
    console.log("items --->>", items);
    if (!page) {
      page = 0;
    }
    if (!items) {
      items = 6;
    }
    const movies = await Movie.find()
      .skip(page * items)
      .limit(items);
    res.status(200).json({ movies });
  }

  // get single movie detail
  public async getMovie(req: Request, res: Response) {
    console.log("params -->>", req.params);
    const { movieId } = req.params;
    const isValid = mongoose.isValidObjectId(movieId);
    if (!isValid) {
      res.status(400).json({ message: "Invalid movie id" });
    } else {
      try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
          res.status(404).json({ message: "Movie not found" });
        } else {
          res.status(200).json({ movie });
        }
      } catch (error) {
        console.log("error", error);
        res.status(400).json(error);
      }
    }
  }
}

export default new MovieContrtoller();
