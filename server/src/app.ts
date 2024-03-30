import compression from "compression";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import configs from "./config";
import logger from "./utils/logger";

mongoose.connection.on("connected", () => {
  logger.info("Connected to database successfully!");
});
mongoose.connection.on("error", () => {
  logger.error("Connection error");
  process.exit();
});
mongoose.connect(configs.mongoUrl);

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression);

export default app;

// export default new App().app;
