import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const newUser = User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    return res.status(201).json({
      response_msg: "user created successfully",
    });
  } catch (error) {
    next(error);
  }
};
