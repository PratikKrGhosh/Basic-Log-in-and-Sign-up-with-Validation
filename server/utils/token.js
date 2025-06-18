import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const signToken = async (data) => {
  try {
    return await jwt.sign(data, env.key, { expiresIn: env.tokenExp });
  } catch (err) {
    return null;
  }
};

export const verifyToken = async (token) => {
  try {
    return await jwt.verify(token, env.key);
  } catch (err) {
    return null;
  }
};
