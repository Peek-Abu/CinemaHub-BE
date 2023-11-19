import mongoose from "mongoose";

const schema = new mongoose.Schema({
    movieId: { type: String, unique: true, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments", default: [] }],
    rating: { type: Number, default: 0 },
}, { collection: "movies" });

export default mongoose.model("movies", schema);