const express = require("express");

//-------constants
const { dto } = require("../utility/uility");
const { routeConstant } = require("../constant");
const {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  getAllVehicles,
} = require("../controllers/vehicleController");
const requireAuth = require("../middleware/requireauth");
const upload = require("../middleware/multer");

const router = express.Router();

router.use(requireAuth);

//------- get all vehicles
router.get(routeConstant.DEFAULT_PATH, getAllVehicles);

//------- get vehicle by id
router.get(routeConstant.VEHICLE_BY_ID_PATH, getVehicleById);

//------- create new vehicle
router.post(
  routeConstant.DEFAULT_PATH,
  upload.array("images", 10),
  createVehicle
);

//-------delete vehicle by id
router.delete(routeConstant.VEHICLE_BY_ID_PATH, deleteVehicle);

//------- update vehicle by id
router.patch(routeConstant.VEHICLE_BY_ID_PATH, updateVehicle);

module.exports = router;
