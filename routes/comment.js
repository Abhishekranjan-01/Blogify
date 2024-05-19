import express from "express";
import { Comment } from "../models/comment";

const commentRoutes = express.Router();

commentRoutes.get("/blog/:blogId/comment/:id", (req, res) => {
  console.log(req.params);
  console.log();
  res.redirect("/");
});
