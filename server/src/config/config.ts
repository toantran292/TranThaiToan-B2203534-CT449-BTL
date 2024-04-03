import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "developments";
export const TEST = process.env.NODE_ENV === "test";

export const MONGO_USER = process.env.MONGO_USER || "";
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
export const MONGO_URL = process.env.MONGO_URL || "";
export const MONGO_TABLE = process.env.MONGO_TABLE || "";
export const MONGO_OPTIONS: mongoose.ConnectOptions = {
  retryWrites: true,
  w: "majority",
};

export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN || "asdsad3dawdqa";
export const JWT_REFRESH_TOKEN =
  process.env.JWT_REFRESH_TOKEN || "sadasdsad87q2hd";

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
export const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 12345;

export const mongo = {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_TABLE,
  MONGO_OPTIONS,
  MONGO_CONNECTION: process.env.MONGO_CONNECTION
    ? process.env.MONGO_CONNECTION
    : `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_TABLE}`,
};

export const server = {
  SERVER_HOSTNAME,
  SERVER_PORT,
};

export const jwtConfig = {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
};
