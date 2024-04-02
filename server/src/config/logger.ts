// import { config } from "@root/config";
import { DEVELOPMENT } from "@cofig/config";
import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

const level = () => {
  const isDevelopment = DEVELOPMENT
  return isDevelopment ? 'debug' : 'warn'
}

winston.addColors(colors);


const format = winston.format.combine(
  winston.format(info => {
    info.level = info.level.toUpperCase()
    return info;
  })(),
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.colorize(),
  winston.format.colorize({ all: true }),
  winston.format.printf((log) => {
    if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
    return `[${log.timestamp}] [${log.level}] ${log.message}`;
  }),
)

const transports = [
  new winston.transports.Console(),
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
});

const wrapper = (original: any) => {
  return (...args: any) => original(args.join(" "));
};

logger.error = wrapper(logger.error);
logger.warn = wrapper(logger.warn);
logger.info = wrapper(logger.info);
logger.http = wrapper(logger.http);
logger.verbose = wrapper(logger.verbose);
logger.debug = wrapper(logger.debug);
logger.silly = wrapper(logger.silly);

export default logger;
