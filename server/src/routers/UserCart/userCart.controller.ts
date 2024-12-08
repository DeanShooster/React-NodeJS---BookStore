import express from "express";
import { Request, Response, NextFunction } from "express";

import { auth } from "../../middlewares/authentication";
import { addBookToUserCart } from "./userCart.service";

const router = express.Router();

// --------------------------------------------------------------- POST REQUESTS --------------------------------------------------------------- //

router.post("/cart", auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await addBookToUserCart(req.body.bookName, req.user.email);
    res.send({});
  } catch (e) {
    next(e);
  }
});

export default router;
