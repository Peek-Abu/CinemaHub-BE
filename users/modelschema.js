import mongoose from "mongoose";
const user_roles = ["ADMIN", "USER"];

const schema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: user_roles, default: "USER" },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "users", default: [] }],
    likedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "movies", default: [] }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments", default: []}],
    createdAt: { type: Date, default: Date.now },
    email: { type: String },
}, { collection: "users" });


export default mongoose.model("users", schema);