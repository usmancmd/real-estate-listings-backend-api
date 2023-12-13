import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { customErrorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(customErrorHandler(401, "Unathorized"));

  try {
    if (req.body.password) {
      const salt = bcryptjs.genSaltSync(10);
      req.body.password = bcryptjs.hashSync(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...response } = updatedUser._doc;
    res.status(200).json({ message: "user updated successfully!", response });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(customErrorHandler(401, "Unathorized"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ message: "user deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(customErrorHandler(404, "listing not found"));

    if (req.user.id !== listing.userRef)
      return next(customErrorHandler(401, "Unauthorized"));

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(customErrorHandler(401, "Unauthorized"));

  try {
    await Listing.find({ userRef: req.params.id }).then((listings) => {
      if (listings) res.status(200).json(listings);
    });
  } catch (error) {
    next(error);
  }
};
