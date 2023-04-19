const winston = require("winston");
const { combine, colorize, timestamp, json, prettyPrint } = winston.format;
const warnFilter = winston.format((info, opts) => {
  return info.level === "warn" ? info : false;
});
const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),

  transports: [
    new winston.transports.Console({ level: "info", format: combine(json(), colorize({ all: true })) }),
    new winston.transports.File({ filename: "warn.log", level: "warn", format: combine(warnFilter(), timestamp(), json()) }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

module.exports = logger;
