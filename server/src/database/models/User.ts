import mongoose from "mongoose";
import bcrypt from "bcrypt";

import BookStoreDB from "../connection";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true, minlength: 2 },
  password: { type: String, default: null, minlength: 6 },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const babyMonitorPassword = await bcrypt.hash(this.password, 8);
    this.password = babyMonitorPassword;
  }
  next();
});

UserSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

const User = BookStoreDB.model("User", UserSchema);

export default User;
