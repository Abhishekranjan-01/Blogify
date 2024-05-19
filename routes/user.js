import express from "express";
import { User } from "../models/user.js";

const routes = express.Router();

routes.get("/signup", (req, res) => {
  res.render("signup");
});

routes.get("/signin", (req, res) => {
  res.render("signIn");
});

routes.get("/signout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

routes.post(
  "/signin",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    const { email, password } = req.body;

    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  }
);

routes.post(
  "/signup",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log("NameL\t", fullName);
    console.log("Email\t", email);
    console.log("Password\t", password);

    const newUser = await User.create({
      fullName,
      email,
      password,
    });
    req.user = newUser;
    console.log("New User:\t", newUser);
    res.redirect("/");
  }
);

export default routes;
