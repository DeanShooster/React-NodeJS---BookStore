import mongoose from "mongoose";

import BookStoreDB from "../connection";

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true, minlength: 2 },
  author: { type: String, require: true, trim: true, minlength: 2 },
  year: { type: Number, require: true },
  genre: { type: String, required: true },
  description: { type: String, require: true },
  coverUrl: { type: String, required: true },
  price: { type: Number, required: true },
});

const Book = BookStoreDB.model("Book", BookSchema);

export default Book;
