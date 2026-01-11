const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    password: {
      type: String,

      require: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      //require: true, funciona pero para prueba no es necesario
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },

    identificationType: {
      //enum
      type: String,
    },
    identificationNumber: {
      type: Number,
      unique: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    birthDay: {
      type: Date,
    },
    state: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
