import logger from "@global/utils/logger"
import { config } from "@root/config"
import mongoose from "mongoose"

const setupdb = () => {
  const connect = () => {
    mongoose.connect(`${config.DB_URL}`).then(() => {
      logger.info("Successfully connected to mongo.")
    }).catch((error) => {
      logger.error("Error connecting to database", error);
      return process.exit(1);
    })
  }
  connect();
  mongoose.connection.on('disconnected', connect);
}

export default setupdb;
