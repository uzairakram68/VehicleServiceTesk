require("dotenv").config();

const express = require("express");

//------- constants
const { userMessagesConstants, routeConstant } = require("./constant");

//------- mongoose
const mongoose = require("mongoose");

//------- import routes
const vehicleRoutes = require("./routes/vehicleService");
const authentiationRoutes = require("./routes/authentiction");

//------- Create Express App
const app = express();

//------- middleware
app.use(express.json());
app.use((request, response, next) => {
  console.log(request.method, request.path);
  next();
});

//------- routes
app.use(routeConstant.VEHICLE_PATH, vehicleRoutes);
app.use(routeConstant.AUTHENTICATION_PATH, authentiationRoutes);

//------- conect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //------- Listen for the requests
    app.listen(process.env.PORT, () => {
      console.log(
        `${userMessagesConstants.LISTIENING_ON_PORT} ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
