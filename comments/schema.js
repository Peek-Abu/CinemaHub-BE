import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        commentId: {type: mongoose.Schema.Types.ObjectId, required: true},
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "movies",
            required: true,
        },
        username: {
            type: String,
            ref: "users",
            required: true,
        },
        text: {type: String, required: true},
        starRating: {type: Number, required: true},
        createdAt: {type: Date, default: Date.now},
    },
    {collection: "comments"},
);

export default commentSchema;
