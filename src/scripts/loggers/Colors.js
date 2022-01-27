const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "colors-service" },
  transports: [
    new winston.transports.File({
      filename: "src/logs/color/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "src/logs/color/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "src/logs/color/combined.log",
    }),
    //new winston.transports.Console() // Eğer console'a yazdırmak istersek
  ],
});

module.exports = logger;
