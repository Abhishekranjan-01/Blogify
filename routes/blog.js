import express from "express";
import { blog } from "../models/blog.js";

import multer from "multer";
import { Comment } from "../models/comment.js";

const blogRoutes = express.Router();

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, `./public/upload/`);
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = new Date().toLocaleString();
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

blogRoutes.get("/", async (req, res) => {
  const blogs = await blog.find({});
  req.blogs = blogs;
  console.log(blogs);
  res.redirect("/");
  // res.render("blog", { blogs });
});

blogRoutes.get("/add-new", (req, res) => {
  console.log("Inside Add New Blog:\t");

  // res.redirect("/");
  return res.render("addNewBlog", { user: req?.user });
});

blogRoutes.get("/:id", async (req, res) => {
  const Oneblog = await blog
    .findOne({ _id: req.params.id })
    .populate("createdBy");

  const blogComments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log("One Blog:\t", Oneblog);
  console.log("That Blog Comments:\t", blogComments);

  res.render("blog", {
    blog: Oneblog,
    user: req?.user,
    comments: blogComments,
  });
});

blogRoutes.post(
  "/add-new",
  express.urlencoded({ extended: false }),
  upload.single("coverImage"),
  async (req, res) => {
    const blogDone = await blog.create({
      title: req.body.blogTitle,
      body: req.body.blog,
      coverImage: `/upload/${req.file.filename}`,
      createdBy: req.user._id,
      writtenBy: req.user.fullName,
    });
    console.log("Blog Is Created:\t", blogDone);
    return res.redirect("/");
  }
);

blogRoutes.post(
  "/comment/:id",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    const newComment = await Comment.create({
      blogId: req.params.id,
      content: req.body.comment,
      createdBy: req.user._id,
    });
    console.log("newComment:\t", newComment);
    res.redirect(`/blog/${req.params.id}`);
  }
);

export { blogRoutes };
