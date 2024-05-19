import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    coverImage: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "Users" },
    writtenBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const blog = mongoose.model("Blogs", blogSchema);
