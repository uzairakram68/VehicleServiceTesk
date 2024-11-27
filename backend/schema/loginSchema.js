const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loginSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

loginSchema.statics.login = async (email, password) => {};

module.exports = mongoose.model("loginModel", loginSchema);
