import express from "express";
import {
  deleteUser,
  updateUser,
  getUserListing,
  getUserListings,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { getUserId } from "../middleware/getUserId.js";

const router = express.Router();

router.put("/update", verifyUser, getUserId, updateUser);
router.delete("/delete", verifyUser, getUserId, deleteUser);
router.get("/listing/:id", verifyUser, getUserListing); // requires listing id
router.get("/listings", verifyUser, getUserId, getUserListings); // reqiures

export default router;
