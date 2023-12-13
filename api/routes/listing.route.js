import express from "express";
import {
  createListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.put("/update/:id", verifyUser, updateListing);

export default router;
