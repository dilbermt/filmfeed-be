import mongoose, { Schema } from "mongoose";

export type watchlistType = {
  _id: String;
  userId: String;
  movieId: String;
};

const watchlistSchema = new mongoose.Schema({
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

const WatchList = mongoose.model<watchlistType>("WatchList", watchlistSchema);
export default WatchList;
