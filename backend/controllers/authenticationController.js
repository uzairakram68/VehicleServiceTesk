const { vehicleConstants } = require("../constant");
const userModal = require("../schema/loginSchema");
const { dto } = require("../utility/uility");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//-------create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

//------- login
const login = async (request, response) => {
  const { carModel, price, phoneNumber, maximumNumberOfPictures, images } =
    request.body;
  try {
    const vehicle = await userModal.create({
      carModel,
      price,
      phoneNumber,
      maximumNumberOfPictures,
      images,
    });

    response
      .status(200)
      .json(dto(200, vehicle, vehicleConstants.CREATE_VEHICLE));
  } catch (error) {
    response.status(400).json(dto(400, {}, error.message));
  }
};

module.exports = {
  login,
};
