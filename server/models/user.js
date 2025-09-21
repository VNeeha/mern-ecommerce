// EXTERNAL MODULE
const mongoose = require("mongoose");

// CREATING SCHEMA
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "customer"],
    },
  },
  { timeStamps: true }
);

// CREATING MODEL FROM SCHEMA
module.exports = mongoose.model("User", userSchema);
