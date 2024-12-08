import mongoose from "mongoose";

import BookStoreDB from "../connection";

const UserReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String },
  latestBookPurchased: { type: String },
  fakeTimeStamp: { type: String },
});

const UserReview = BookStoreDB.model("UserReview", UserReviewSchema);

export default UserReview;
