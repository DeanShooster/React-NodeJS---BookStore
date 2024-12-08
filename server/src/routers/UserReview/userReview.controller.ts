import express from "express";
import { Request, Response, NextFunction } from "express";

import UserReview from "../../database/models/UserReview";

const router = express.Router();

// --------------------------------------------------------------- GET REQUESTS --------------------------------------------------------------- //

router.get("/books/latest-reviews", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const latestReviews = await UserReview.find().select("-_id -__v").lean();
    res.send(latestReviews);
  } catch (e) {
    next(e);
  }
});

export default router;
