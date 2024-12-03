import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./secret.js";

// json web token

export const jwtToken = (data, time = "1d") => {
  const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: time,
  });
  return token;
};
