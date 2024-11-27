const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    carModel: {
      type: String,
      required: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{11}$/.test(v); //------- Validates exactly 11 digits
        },
        message: "Phone number must be exactly 11 digits long.",
      },
    },
    maximumNumberOfPictures: {
      type: Number,
      required: true,
      min: [1, "Number of pictures must be at least 1."], //------- Minimum value 1
      max: [10, "Number of pictures cannot exceed 10."], //------- Maximum value 10
    },
    images: {
      type: [String], // Array of strings to store image URLs or file paths
      required: false, // Optional field, can be empty
      validate: {
        validator: function (v) {
          // Ensure the number of images does not exceed the maximum limit
          return v.length <= this.maximumNumberOfPictures; // Check the number of images
        },
        message: "Number of images exceeds the maximum allowed.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("vehicleModel", vehicleSchema);
