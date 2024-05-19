import jwt from "jsonwebtoken";
export default function authenticateCookie(name) {
  const SECRET_KEY = "@private_blog@bloag-app#";
  return async (req, res, next) => {
    console.log("I Am Authenticate Cookie");
    try {
      const token = await req.cookies?.[name];
      if (!token) return next();
      const user = jwt.verify(token, SECRET_KEY);
      req.user = user;
      console.log("Successfylly token verified");
      next();
    } catch (err) {
      console.log("Something went wrong-1:\t", err);
      console.log("2nd Line Afer Token Expired-2");
      return res.clearCookie("token").redirect("/");
    }
  };
}
