import { mkdir } from "node:fs";

// Create ./tmp/a/apple, regardless of whether ./tmp and ./tmp/a exist.
export default function checkUniqueUserDirectory(email) {
  mkdir(`./public/upload/${email}`, { recursive: false }, (err) => {
    if (err) return email;
  });

  return email;
}
