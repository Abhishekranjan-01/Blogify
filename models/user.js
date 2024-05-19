import mongoose from "mongoose";
import getNewToken from "../services/authentication.js";
const { createHmac, randomBytes } = await import("node:crypto");

const userShema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    profileImageUrl: {
      type: String,
      required: true,
      default: "/images/defaultUserImage.png",
    },
  },
  { timestamps: true }
);

userShema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return new Error("No User Found With Given Email");

    const salt = user.salt;
    const EnteredPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (user.password !== EnteredPassword) return new Error("Wrong Password");

    const token = getNewToken(user);
    return token;
  }
);

userShema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();

  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

export const User = mongoose.model("Users", userShema);
