import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Extracting query parameters
    const {
      searchTerm,
      mileageMin,
      mileageMax,
      priceMin,
      priceMax,
      transmission,
      fuelType,
      sort,
      order,
    } = req.query;

    // Building the filter object for MongoDB query
    const filter = {
      $or: [
        { model: { $regex: searchTerm || "", $options: "i" } }, // Search by model
        { make: { $regex: searchTerm || "", $options: "i" } }, // Search by make
      ],
      price: {
        $gte: parseInt(priceMin) || 0,
        $lte: parseInt(priceMax) || 1000000,
      },
      mileage: {
        $gte: parseInt(mileageMin) || 0,
        $lte: parseInt(mileageMax) || 100,
      },
    };

    // Adding optional filters if provided
    if (transmission && transmission !== "all") {
      filter.transmission = transmission;
    }

    if (fuelType && fuelType !== "all") {
      filter.fuelType = fuelType;
    }

    // Executing the MongoDB query
    const listings = await Listing.find(filter)
      .sort({ [sort || "createdAt"]: order || "desc" })
      .limit(limit)
      .skip(startIndex);
    // console.log(filter);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
