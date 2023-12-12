import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { customErrorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";
import { response } from "express";

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(customErrorHandler(404, "wrong credentials!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(customErrorHandler(404, "from passwd wrong credentials!"));

    const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: passwd, ...response } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ response_msg: "user signed in successfully", response });
  } catch (error) {
    next(error);
  }
};
