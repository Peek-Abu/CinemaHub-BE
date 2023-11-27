import mongoose from "mongoose";

const schema = new mongoose.Schema({
    commentId: { type: String, unique: true, required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movies", required: true },
    username: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    text: { type: String, required: true },
    starRating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
}, { collection: "comments" });

export default mongoose.model("comments", schema);