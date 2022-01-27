const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "brands-service" },
  transports: [
    new winston.transports.File({
      filename: "src/logs/brand/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "src/logs/brand/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "src/logs/brand/combined.log",
    }),
    //new winston.transports.Console() // Eğer console'a yazdırmak istersek
  ],
});

module.exports = logger;
