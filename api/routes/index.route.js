import express from "express";
import { indexPage } from "../controllers/index.controller.js";

const router = express.Router();

router.get("/", indexPage);

export default router;
