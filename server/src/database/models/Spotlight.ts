import mongoose from "mongoose";

import BookStoreDB from "../connection";

const SpotLightSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, unique: true },
  category: { type: String, required: true, trim: true },
  year: { type: Number, require: true },
  desc: { type: String, require: true },
});

const SpotLight = BookStoreDB.model("Spotlight", SpotLightSchema);

export default SpotLight;
