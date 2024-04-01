import dotenv from "dotenv";
dotenv.config();

class Config {
  // public PRIVATE_KEY: string | null;
  // public TOKEN_EXPIRY:
  public DB_URL: string | undefined;
  public JWT_ACCESS_TOKEN: string | null;
  public JWT_REFRESH_TOKEN: string | null;
  public NODE_ENV: string | undefined;

  private readonly DEFAULT_DB_URL = "mongodb+srv://tranthaitoan999:29022004@ct449.m6vo3ck.mongodb.net/bookstore?retryWrites=true&w=majority&appName=CT449";

  constructor() {
    this.DB_URL = process.env.DB_URL || this.DEFAULT_DB_URL;
    this.JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN || "asdsad3dawdqa";
    this.JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN || "sadasdsad87q2hd";
    this.NODE_ENV = process.env.NODE_ENV;
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined)
        throw new Error(`Configuration ${key} is undefined.`);
    }
  }
}

export const config: Config = new Config();
