import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, unique: true, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments", default: [] }],
    rating: { type: Number },
}, { collection: "movies" });

export default movieSchema;