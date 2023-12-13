import express from "express";
import {
  deleteUser,
  updateUser,
  getUserListing,
  getUserListings,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/listing/:id", verifyUser, getUserListing); // requires listing id
router.get("/listings/:id", verifyUser, getUserListings); // reqiures user id id

export default router;
