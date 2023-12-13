import { customErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const addUserRef = (req, res, next) => {
  try {
    req.body.userRef = req.user.id;
    next();
  } catch (error) {
    next(error);
  }
};
