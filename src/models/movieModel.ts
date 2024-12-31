import mongoose from "mongoose";

export type MovieType = {
  _id: string;
  imdbId: string;
  title: string;
  primaryImage: string | null | undefined;
  description: string;
  startYear: number;
  endYear: number | null;
  runtimeMinutes: number;
  contentRating: string;
  type: string;
};

const movieSchema = new mongoose.Schema({
  imdbId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  primaryImage: {
    type: String,
    required: false,
    default: "",
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: false,
  },
  runtimeMinutes: {
    type: Number,
    required: true,
  },
  contentRating: {
    type: String,
    required: false,
    default: "",
  },
  type: {
    type: String,
    required: false,
    default: "movie",
  },
});

const Movie = mongoose.model<MovieType>("Movie", movieSchema);
export default Movie;
