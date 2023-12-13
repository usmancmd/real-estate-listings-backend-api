import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
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
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(errorHandler);
