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

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(customErrorHandler(404, "listing not found!"));

  if (req.user.id !== listing.userRef)
    return next(customErrorHandler(401, "Unauthorized"));

  try {
    await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).then((updatedListing) => {
      if (updatedListing)
        res
          .status(200)
          .json({ message: "listing updated successfully", updatedListing });
    });
  } catch (error) {
    next(error);
  }
};
