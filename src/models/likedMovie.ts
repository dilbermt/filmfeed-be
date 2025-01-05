import mongoose, { Schema } from "mongoose";

export type likedMovieType = {
  _id: String;
  userId: String;
  movieId: String;
};

const likedMovieSchema = new mongoose.Schema({
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
});

const LikedMovie = mongoose.model<likedMovieType>(
  "LikedMovie",
  likedMovieSchema
);
export default LikedMovie;
