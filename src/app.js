const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const { BrandsRoutes } = require("./api-routes");

config();
//loaders();

const app = express();
app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
  console.log(`Sunucu ${process.env.APP_PORT}. portta çalışıyor`);

  app.use("/brands", BrandsRoutes);
});
