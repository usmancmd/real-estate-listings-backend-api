import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./api/middleware/errorHandler.js";
import mongoose from "mongoose";
import authRouter from "./api/routes/auth.route.js";
import userRouter from "./api/routes/user.route.js";
import listingRouter from "./api/routes/listing.route.js";
import indexRouter from "./api/routes/index.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

mongoose
	.connect(process.env.MONGO_CONN_STRING)
	.then(() => {
		console.log("connected to MongoDB!!!");
	})
	.catch((error) => {
		console.log(error);
	});

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.static("public"));
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
	console.log(`server running on port ${process.env.PORT}`);
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/listings", listingRouter);
app.use("/", indexRouter);

app.use(errorHandler);
