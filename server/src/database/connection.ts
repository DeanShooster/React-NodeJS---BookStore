import mongoose from "mongoose";

const BookStoreDB = mongoose.createConnection(process.env.DB_KEY_NAME || "");

BookStoreDB.on("connected", () => {
  console.log("Database connection established successfully");
});

BookStoreDB.on("error", (error) => {
  console.error("Database connection error:", error);
});

export default BookStoreDB;
