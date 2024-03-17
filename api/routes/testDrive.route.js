// testDriveRoutes.js

import express from "express";
const router = express.Router();
import {
  bookingAvailability,
  userBookingTestDrive,
  bookTestDrive,
  approveRequest,
  rejectRequest,
} from "../controllers/testDrive.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// Route for creating a new test drive
router.post("/schedule", bookTestDrive);

//Booking Avliability
router.post("/booking-availbility", bookingAvailability);

//Appointments List
router.post("/user-booking", userBookingTestDrive);

// Add more routes as needed (e.g., for updating and retrieving test drives)

router.put("/:id/approve", approveRequest);
router.put("/:id/reject", rejectRequest);

export default router;
