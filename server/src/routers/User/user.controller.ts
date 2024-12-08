import express from "express";
import { Request, Response, NextFunction } from "express";

import { UserError } from "../../middlewares/errorHandler";
import { ERROR_MESSAGES } from "../../constants/enum";

import { createUser, login } from "./user.service";
import { auth } from "../../middlewares/authentication";

const router = express.Router();

// --------------------------------------------------------------- GET REQUESTS --------------------------------------------------------------- //

router.get("/user/auth", auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({ user: req.user });
  } catch (e) {
    next(e);
  }
});

// --------------------------------------------------------------- POST REQUESTS --------------------------------------------------------------- //

router.post("/user/create", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) return next(new UserError(ERROR_MESSAGES.BAD_REQUEST, 400));

    const { user, token } = await createUser(email, name, password);

    res.send({ user, token });
  } catch (e) {
    next(e);
  }
});

router.post("/user/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(new UserError(ERROR_MESSAGES.BAD_REQUEST, 400));

    const { user, token } = await login(email, password);

    res.send({ user, token });
  } catch (e) {
    next(e);
  }
});

export default router;
