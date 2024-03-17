import mongoose from "mongoose";

const { Schema } = mongoose;

const testDriveSchema = new Schema(
  {
    listingId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    listingInfo: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TestDrive = mongoose.model("TestDrive", testDriveSchema);

export default TestDrive;
