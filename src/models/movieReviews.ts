import mongoose, { Schema } from "mongoose";

export type movieReviewType = {
  _id: String;
  userId: String;
  movieId: String;
  rating: Number;
  review: String;
};

const movieReviewSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: false,
    default: "",
  },
});

const MovieReview = mongoose.model<movieReviewType>(
  "MovieReview",
  movieReviewSchema
);
export default MovieReview;
