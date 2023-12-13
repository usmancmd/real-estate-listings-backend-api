import express from "express";
import {
  createListing,
  deleteListing,
  getListings,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { addUserRef } from "../middleware/addUserRef.js";

const router = express.Router();

router.post("/create", verifyUser, addUserRef, createListing);
router.put("/update/:id", verifyUser, updateListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.get("/", getListings);

export default router;
