import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getUserListings,
  getUser,
  getAllNotificationController,
  markAllNotificationAsReadController,
  deleteAllNotificationController,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);

router.post("/get-all-notification", getAllNotificationController);

router.post("/delete-all-notification", deleteAllNotificationController);

router.post(
  "/mark-all-notification-as-read",
  markAllNotificationAsReadController
);

export default router;
