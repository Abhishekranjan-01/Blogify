import "dotenv/config";
import express from "express";
import path from "path";
import userRoutes from "./routes/user.js";
import connectToDb from "./connection.js";
import authenticateCookie from "./middlewares/authentication.js";
import cookieParser from "cookie-parser";
import { blogRoutes } from "./routes/blog.js";
import { blog } from "./models/blog.js";

const app = express();
const PORT = process.env.PORT;
//Connect To mongoose DB
// `mongodb://127.0.0.1:27017/blog-app`
connectToDb(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", [path.resolve("./views"), path.resolve("./views/blog")]);

app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(authenticateCookie("token"));

app.get("/", async (req, res) => {
  const user = req?.user;

  const blogs = await blog.find({});
  req.blogs = blogs;

  res.render("home", { blogs, user: req?.user });
  // res.render("home", { ...user });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is up at PORT:\t${PORT}`);
});
