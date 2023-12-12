import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

app.use(errorHandler);
