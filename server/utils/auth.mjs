import jwt from "jsonwebtoken";

export const generateWebToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "10d" });
};
