import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  blogId: { type: Schema.Types.ObjectId, ref: "Blogs" },
  createdBy: { type: Schema.Types.ObjectId, ref: "Users" },
});

export const Comment = mongoose.model("Comments", commentSchema);
