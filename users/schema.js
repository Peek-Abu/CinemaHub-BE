import mongoose from "mongoose";
const user_roles = ["ADMIN", "USER"];

const schema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: user_roles, default: "USER" },
    following: [{ type: String, ref: "users", default: [] }],
    reviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "reviews", default: [] },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "users" },
);

export default schema;
