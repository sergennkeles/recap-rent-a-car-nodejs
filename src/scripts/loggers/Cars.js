const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "cars-service" },
  transports: [
    new winston.transports.File({
      filename: "src/logs/car/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "src/logs/car/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "src/logs/car/combined.log",
    }),
    //new winston.transports.Console() // Eğer console'a yazdırmak istersek
  ],
});

module.exports = logger;
