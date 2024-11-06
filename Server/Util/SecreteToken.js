import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const CreateSecreteToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
