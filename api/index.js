import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import mongoose from "mongoose";
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

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

app.use(errorHandler);
