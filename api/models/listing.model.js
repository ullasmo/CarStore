import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    mileage: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
    },
    color: {
      type: String,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual", "Other"],
    },
    fuelType: {
      type: String,
      enum: ["Gasoline", "Diesel", "Electric", "Other"],
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
