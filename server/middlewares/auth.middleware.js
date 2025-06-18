import { verifyToken } from "../utils/token.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = await verifyToken(token);
  } catch (err) {
    req.user = null;
  }

  return next();
};
