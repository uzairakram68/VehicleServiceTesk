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
  const { email, password } = request.body;
  try {
    const user = await userModal.login(email, password);

    const token = createToken(user._id);

    response
      .status(200)
      .json(
        dto(
          true,
          { email: email, token: token },
          vehicleConstants.CREATE_VEHICLE
        )
      );
  } catch (error) {
    response.status(400).json(dto(false, {}, error.message));
  }
};

module.exports = {
  login,
};
