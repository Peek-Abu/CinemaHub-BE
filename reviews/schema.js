import mongoose from "mongoose";

const schema = mongoose.Schema(
    {
        movieId: { type: String, required: true },
        username: { type: String, ref: "users", required: true },
        text: {type: String, required: true},
        starRating: {type: Number, required: true},
        createdAt: {type: Date, default: Date.now},
    },
    {collection: "reviews"},
);

export default schema;
