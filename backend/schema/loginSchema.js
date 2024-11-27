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
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

loginSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All Fields Must be Filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error(`User with this email not found`);
  }
  console.log("user", user, password);
  if (password !== user.password) {
    throw Error(`Password is incorrect`);
  }

  return user;
};

module.exports = mongoose.model("loginModel", loginSchema);
