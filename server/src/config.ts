import dotenv from "dotenv";
dotenv.config();

export interface Configs {
  portNumber: string | number;
  privateKey: string;
  tokenExpiry: number;
  mongoUrl: string;
}

const configs: Configs = {
  portNumber: process.env.PORT || 3000,
  privateKey: process.env.PRIVATE_KEY || "@981s19127gas8AJHV@98",
  tokenExpiry: 30 * 60 * 1000,
  mongoUrl: process.env.MONGO_URL || "",
};

export default configs;
