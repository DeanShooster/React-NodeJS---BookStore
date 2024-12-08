import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../database/models/User";

import { ERROR_MESSAGES } from "../constants/enum";
import { UserError } from "./errorHandler";

interface IDecodedJwtPayload extends JwtPayload {
  name: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token as string, process.env.SECRET || "") as IDecodedJwtPayload;

    const user = await User.findOne({ email: decoded.email }).select("-password -_id -__v").populate("cart").lean();
    if (!user) return next(new UserError(ERROR_MESSAGES.FORBIDDEN, 403));

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};
