import Listing from "../models/listing.model.js";
import { customErrorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  if (req.user.id !== req.body.userRef)
    return next(customErrorHandler(403, "Forbidden"));

  try {
    await Listing.create(req.body).then((listing) => {
      return res
        .status(201)
        .json({ message: "listing created successfully", listing });
    });
  } catch (error) {
    next(error);
  }
};
