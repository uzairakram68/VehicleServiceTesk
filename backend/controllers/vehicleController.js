const { vehicleConstants } = require("../constant");
const vehicleModel = require("../schema/vehicleSchema");
const { dto } = require("../utility/uility");
const { cloudinary } = require("../config/config");
const mongoose = require("mongoose");

//------- get all vehicles
const getAllVehicles = async (request, response) => {
  try {
    const vehicles = await vehicleModel.find({}).sort({ createdAt: -1 });

    response
      .status(200)
      .json(dto(200, vehicles, vehicleConstants.VEHICLE_FOUND));
  } catch (error) {
    response.status(400).json(dto(400, {}, error.message));
  }
};

//------- get vehicle by id
const getVehicleById = async (request, response) => {
  const { id } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response
        .status(404)
        .json(dto(404, "", vehicleConstants.NO_VEHICLE_FOUND));
    }

    const vehicle = await vehicleModel.findById(id);
    if (!vehicle) {
      return response
        .status(404)
        .json(dto(404, "", vehicleConstants.NO_VEHICLE_FOUND));
    }
    response
      .status(200)
      .json(dto(200, vehicle, vehicleConstants.VEHICLE_FOUND));
  } catch (error) {
    response.status(400).json(dto(400, {}, error.message));
  }
};

//------- create new vehicle
const createVehicle = async (request, response) => {
  const { carModel, price, phoneNumber, maximumNumberOfPictures, images } =
    request.body;
  const files = request.files;
  try {
    // Validate input
    if (!files || files.length === 0) {
      return response
        .status(400)
        .json(dto(400, {}, "No images provided for the vehicle."));
    }

    // Upload images to Cloudinary
    const imageUploads = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "vehicles",
        });
        return result.secure_url; // Get the URL of the uploaded image
      })
    );

    const vehicle = await vehicleModel.create({
      carModel,
      price,
      phoneNumber,
      maximumNumberOfPictures,
      images: imageUploads,
    });

    response
      .status(200)
      .json(dto(200, vehicle, vehicleConstants.CREATE_VEHICLE));
  } catch (error) {
    response.status(400).json(dto(400, {}, error.message));
  }
};
//-------delete vehicle by id
const deleteVehicle = async (request, response) => {
  const { id } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response
        .status(404)
        .json(dto(404, "", vehicleConstants.NO_VEHICLE_FOUND));
    }

    const vehicle = await vehicleModel.findOneAndDelete({ _id: id });
    if (!vehicle) {
      return response
        .status(404)
        .json(dto(404, "", vehicleConstants.NO_VEHICLE_FOUND));
    }
    response
      .status(200)
      .json(dto(200, vehicle, vehicleConstants.VEHICLE_DELETED));
  } catch (error) {
    response.status(400).json(dto(400, {}, error.message));
  }
};

//------- update vehicle by id
const updateVehicle = async (request, response) => {
  const { id } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response
        .status(404)
        .json(dto(404, "", vehicleConstants.NO_VEHICLE_FOUND));
    }

    const vehicle = await vehicleModel.findOneAndUpdate(
      { _id: id },
      { ...request.body }
    );
    if (!vehicle) {
      return response
        .status(404)
        .json(dto(404, "", vehicleConstants.NO_VEHICLE_FOUND));
    }
    response
      .status(200)
      .json(dto(200, vehicle, vehicleConstants.VEHICLE_UPDATED));
  } catch (error) {
    response.status(400).json(dto(400, {}, error.message));
  }
};

module.exports = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  getAllVehicles,
};
