import express from "express";
import { Request, Response, NextFunction } from "express";

import Book from "../../database/models/Book";
import SpotLight from "../../database/models/Spotlight";

const router = express.Router();

// --------------------------------------------------------------- GET REQUESTS --------------------------------------------------------------- //

router.get("/books/spotlight", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const spotlight = await SpotLight.find().select("-_id -__v").lean();
    res.send(spotlight);
  } catch (e) {
    next(e);
  }
});

router.get("/books", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find().select("-_id -__v").lean();
    res.send(books);
  } catch (e) {
    next(e);
  }
});

export default router;
