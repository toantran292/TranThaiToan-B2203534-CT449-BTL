import { server } from "@cofig/config";
import fs from "fs";
import path from "path";

export const getDirectory = (name: string) => {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(name);
  }
  return name;
};

export const getDateDirectoryName = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10); // YYYY-MM-DD
};

// Helper function to get the current date/time in a format suitable for filename
export const getCurrentDateTime = () => {
  const now = new Date();
  return now.toISOString().replace(/[-:]/g, "").replace(/\..+/, ""); // YYYYMMDDTHHMMSS
};

// Helper function to get the file extension
export const getExtension = (filename) => {
  return path.extname(filename).slice(1).toLowerCase(); // Remove dot and convert to lowercase
};

export const getPathOfImage = (filename: string) => {
  return `${server.MEDIA_HOST}/${filename}`;
};
