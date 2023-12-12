import { customErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(customErrorHandler(401, "Unauthorised"));

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return next(customErrorHandler(403, "Forbidden"));

      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
