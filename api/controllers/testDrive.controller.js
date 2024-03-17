import TestDrive from "../models/testDrive.model.js";
import moment from "moment";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
// Controller method for scheduling a new test drive
export const scheduleTestDrive = async (req, res) => {
  try {
    const { listing, user, userId, listingId, status, time } = req.body;
    console.log(time);
    // Create a new test drive instance
    const newTestDrive = new TestDrive({
      listing,
      user,
      userId,
      listingId,
      status,
      time,
    });

    // Save the new test drive to the database
    await newTestDrive.save();

    res.status(201).json({
      success: true,
      message: "Test drive scheduled successfully",
      data: newTestDrive,
    });
  } catch (error) {
    console.error("Error scheduling test drive:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller method for checking test drive booking availability
export const bookingAvailability = async (req, res) => {
  try {
    const fromTime = new Date(req.body.time);
    const toTime = new Date(req.body.time);
    fromTime.setHours(fromTime.getHours() - 1);
    toTime.setHours(toTime.getHours() + 3);

    const listingId = req.body.listingId;
    const testDrives = await TestDrive.find({
      listingId,
      time: { $gte: fromTime, $lte: toTime },
    });

    if (testDrives.length > 0) {
      return res.status(200).send({
        message: "Not available at this time",
        success: false,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Available for booking!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in checking availability",
    });
  }
};

// Controller method for booking a test drive
export const bookTestDrive = async (req, res) => {
  try {
    req.body.time = new Date(req.body.time);
    req.body.status = "pending";
    req.body.userInfo = await User.findOne({ _id: req.body.userId });
    const { username } = await req.body.userInfo;
    req.body.username = username;

    const car = await Listing.findOne({ _id: req.body.listingId });
    req.body.listingInfo = car;
    const { make, model } = await car;
    req.body.make = make;
    req.body.model = model;

    const newTestDrive = new TestDrive(req.body);
    await newTestDrive.save();

    const { userRef } = car;
    const carOwner = await User.findOne({ _id: userRef });

    const { notification } = carOwner;
    notification.push({
      type: "New-test-drive-request",
      message: `A new test drive request from ${req.body.userInfo.username}`,
      onClickPath: "/test-drive-booked",
    });
    await car.save();
    await carOwner.save();

    res.status(200).send({
      success: true,
      message: "Test drive request sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while sending request",
    });
  }
};

// Controller method for fetching test drives booked by a user
export const userBookingTestDrive = async (req, res) => {
  try {
    const userCars = await Listing.find({ userRef: req.body.userId });
    const userCarIds = userCars.map((car) => car._id);
    const testDrives = await TestDrive.find({
      listingId: { $in: userCarIds },
    });

    res.status(200).send({
      success: true,
      message: "User's test drives fetched successfully",
      data: testDrives,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error fetching user's test drives",
    });
  }
};

// Controller method for approving a test drive request
export const approveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const testDrive = await TestDrive.findById(id);
    if (!testDrive) {
      return res
        .status(404)
        .json({ success: false, message: "Test drive request not found" });
    }
    testDrive.status = "approved";
    await testDrive.save();

    const user = await User.findById(testDrive.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.notification.push({
      type: "Test drive",
      message: `Your test drive request for ${testDrive.make} ${testDrive.model} has been approved.`,
      onClickPath: "/test-drive-booked",
    });
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Test drive approved successfully" });
  } catch (error) {
    console.error("Error approving test drive:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller method for rejecting a test drive request
export const rejectRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const testDrive = await TestDrive.findById(id);
    if (!testDrive) {
      return res
        .status(404)
        .json({ success: false, message: "Test drive not found" });
    }
    testDrive.status = "rejected";
    await testDrive.save();

    const user = await User.findById(testDrive.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.notification.push({
      type: "Test drive",
      message: `Your test drive request for ${testDrive.make} ${testDrive.model} has been rejected.`,
      onClickPath: "/test-drive-booked",
    });
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Test drive rejected successfully" });
  } catch (error) {
    console.error("Error rejecting test drive:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
