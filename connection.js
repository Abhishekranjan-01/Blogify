import mongoose from "mongoose";

export default function connectToDb(url) {
  mongoose
    .connect(url)
    .then(() => console.log("Connected!"))
    .catch((err) => {
      console.log("Something Went Wrong:\t", err);
    });
}
