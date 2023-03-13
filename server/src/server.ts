import { app } from "./app";
import { createServer } from "http";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const Config = {
  PORT: process.env.PORT || 2000,
  MONGO: process.env.MONGO_URI,
};
mongoose.set("strictQuery", true);

const connectServer = () => {
  try {
    mongoose.connect(Config.MONGO!);
    createServer(app).listen(Config.PORT);
    console.log(`server is listening on ${Config.PORT}`);
  } catch (error) {
    console.log(error);
  }
};

connectServer();
