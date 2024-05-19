import jwt from "jsonwebtoken";

export default function getNewToken(user) {
  const SECRET_KEY = "@private_blog@bloag-app#";

  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    profileImageUrl: user.profileImageUrl,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  return token;
}
