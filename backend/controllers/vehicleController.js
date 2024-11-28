const { vehicleConstants } = require("../constant");
const vehicleModel = require("../schema/vehicleSchema");
const { dto } = require("../utility/uility");
const mongoose = require("mongoose");

//------- get all vehicles
const getAllVehicles = async (request, response) => {
  try {
    const vehicles = await vehicleModel.find({}).sort({ createdAt: -1 });

    response
      .status(200)
      .json(dto(true, vehicles, vehicleConstants.VEHICLE_FOUND));
  } catch (error) {
    response.status(400).json(dto(false, {}, error.message));
  }
};

//------- get vehicle by id
const getVehicleById = async (request, response) => {
  const { id } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response
        .status(404)
        .json(dto(false, "", vehicleConstants.NO_VEHICLE_FOUND));
    }

    const vehicle = await vehicleModel.findById(id);
    if (!vehicle) {
      return response
        .status(404)
        .json(dto(false, "", vehicleConstants.NO_VEHICLE_FOUND));
    }
    response
      .status(200)
      .json(dto(true, vehicle, vehicleConstants.VEHICLE_FOUND));
  } catch (error) {
    response.status(400).json(dto(false, {}, error.message));
  }
};

//------- create new vehicle
const createVehicle = async (request, response) => {
  const { carModel, price, phoneNumber, maximumNumberOfPictures } =
    request.body;
  const files = request.files;
  try {
    // Validate input
    if (!files || files.length === 0) {
      return response
        .status(400)
        .json(dto(false, {}, vehicleConstants.NO_IMAGES_PROVIDED));
    }

    // Upload images to Cloudinary
    const imageUrls = await uploadImagesToCloudinary(files);

    const vehicle = await vehicleModel.create({
      carModel,
      price,
      phoneNumber,
      maximumNumberOfPictures,
      images: imageUrls,
    });

    response
      .status(200)
      .json(dto(true, vehicle, vehicleConstants.CREATE_VEHICLE));
  } catch (error) {
    response.status(400).json(dto(false, {}, error.message));
  }
};
//-------delete vehicle by id
const deleteVehicle = async (request, response) => {
  const { id } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response
        .status(404)
        .json(dto(false, "", vehicleConstants.NO_VEHICLE_FOUND));
    }

    const vehicle = await vehicleModel.findOneAndDelete({ _id: id });
    if (!vehicle) {
      return response
        .status(404)
        .json(dto(false, "", vehicleConstants.NO_VEHICLE_FOUND));
    }
    response
      .status(200)
      .json(dto(true, vehicle, vehicleConstants.VEHICLE_DELETED));
  } catch (error) {
    response.status(400).json(dto(false, {}, error.message));
  }
};

//------- update vehicle by id
const updateVehicle = async (request, response) => {
  const { id } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response
        .status(404)
        .json(dto(false, "", vehicleConstants.NO_VEHICLE_FOUND));
    }

    const vehicle = await vehicleModel.findOneAndUpdate(
      { _id: id },
      { ...request.body }
    );
    if (!vehicle) {
      return response
        .status(404)
        .json(dto(false, "", vehicleConstants.NO_VEHICLE_FOUND));
    }
    response
      .status(200)
      .json(dto(true, vehicle, vehicleConstants.VEHICLE_UPDATED));
  } catch (error) {
    response.status(400).json(dto(false, {}, error.message));
  }
};

module.exports = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  getAllVehicles,
};
