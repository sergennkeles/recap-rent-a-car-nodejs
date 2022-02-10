const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const errorHandler = require("./middlewares/ErrorHandler");
const fileUpload = require("express-fileupload");
const events = require("./scripts/events");
const path=require("path")
const { BrandsRoutes, ColorsRoutes, UsersRoutes, CarsRoutes, RentalsRoutes, CustomersRoutes, CarImagesRoutes } = require("./api-routes");

config();
loaders();
events();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads"))); 

app.listen(process.env.APP_PORT, () => {
  console.log(`Sunucu ${process.env.APP_PORT}. portta çalışıyor`);

  app.use("/brands", BrandsRoutes);
  app.use("/colors", ColorsRoutes);
  app.use("/users", UsersRoutes);
  app.use("/cars", CarsRoutes);
  app.use("/rentals", RentalsRoutes);
  app.use("/customers", CustomersRoutes);
  app.use("/car-images", CarImagesRoutes);
  app.use((req, res, next) => {
    const error = new Error("Aradığınız sayfa bulunmamaktadır.");
    error.status = 404;
    next(error);
  });
  app.use(errorHandler);
});



