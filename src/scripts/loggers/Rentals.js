const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "rentals-service" },
  transports: [
    new winston.transports.File({
      filename: "src/logs/rental/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "src/logs/rental/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "src/logs/rental/combined.log",
    }),
    //new winston.transports.Console() // Eğer console'a yazdırmak istersek
  ],
});

module.exports = logger;
