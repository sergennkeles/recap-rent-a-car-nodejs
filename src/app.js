const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const errorHandler = require("./middlewares/ErrorHandler");
const { BrandsRoutes, ColorsRoutes, UsersRoutes, CarsRoutes, RentalsRoutes, CustomersRoutes } = require("./api-routes");

config();
loaders();

const app = express();
app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
  console.log(`Sunucu ${process.env.APP_PORT}. portta çalışıyor`);

  app.use("/brands", BrandsRoutes);
  app.use("/colors", ColorsRoutes);
  app.use("/users", UsersRoutes);
  app.use("/cars", CarsRoutes);
  app.use("/rentals", RentalsRoutes);
  app.use("/customers", CustomersRoutes);

  app.use((req, res, next) => {
    const error = new Error("Aradığınız sayfa bulunmamaktadır.");
    error.status = 404;
    next(error);
  });
  app.use(errorHandler);
});
