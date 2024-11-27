const express = require("express");
const router = express.Router();
const { routeConstant } = require("../constant");
const { login } = require("../controllers/authenticationController");

//-------login
router.post(routeConstant.LOGIN, login);

module.exports = router;
