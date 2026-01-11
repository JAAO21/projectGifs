const mongoose = require("mongoose");
const UserModel = require("./user.model");

const { Schema } = mongoose;

const GifFavoriteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const GifFavoriteModel = mongoose.model("GifFavorite", GifFavoriteSchema);
module.exports = GifFavoriteModel;
