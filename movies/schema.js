import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        omdbMovieId: {
            type: String,
            unique: true,
            required: true,
        },
        title: {type: String, required: true},
        comments: [
            {type: mongoose.Schema.Types.ObjectId, ref: "comments", default: []},
        ],
        rating: {type: Number},
    },
    {collection: "movies"},
);

export default movieSchema;
