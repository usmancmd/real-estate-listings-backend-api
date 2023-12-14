import Listing from "../models/listing.model.js";
import { customErrorHandler } from "../utils/error.js";
import { modifyListings } from "../utils/modifyListing.js";

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

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(customErrorHandler(404, "listing does not exist"));

  if (req.user.id !== listing.userRef)
    return next(customErrorHandler(401, "from id Unauthorized"));

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "listing deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const name = req.query.name || "";
    const description = req.query.description || "";
    const address = req.query.address || "";

    let { parking, furnished, type } = req.query;

    if (furnished === undefined || furnished === "false")
      furnished = { $in: [false, true] };

    if (parking === undefined || parking === "false")
      parking = { $in: [false, true] };

    if (type === undefined) type = { $in: ["sale", "rent"] };

    const listings = await Listing.find({
      name: { $regex: name, $options: "i" },
      description: { $regex: description, $options: "i" },
      address: { $regex: address, $options: "i" },
      furnished,
      parking,
      type,
    })
      .limit(limit)
      .skip(startIndex);

    const modifiedListings = modifyListings(listings);

    return res.status(200).json(modifiedListings);
  } catch (error) {
    next(error);
  }
};
