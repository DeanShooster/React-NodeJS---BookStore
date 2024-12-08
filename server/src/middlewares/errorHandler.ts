import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../constants/enum";

export class UserError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  let ErrorOb;
  switch (error.message) {
    case ERROR_MESSAGES.BAD_REQUEST: {
      ErrorOb = { Error: ERROR_MESSAGES.BAD_REQUEST, Status: error.status };
      break;
    }
    case ERROR_MESSAGES.USER_ALREADY_EXIST: {
      ErrorOb = { Error: ERROR_MESSAGES.USER_ALREADY_EXIST, Status: error.status };
      break;
    }
    case ERROR_MESSAGES.NO_ACCESS:
    case ERROR_MESSAGES.FORBIDDEN: {
      ErrorOb = { Error: ERROR_MESSAGES.NO_ACCESS, Status: error.status };
      break;
    }
  }

  // MongoDB Model builtin error handler
  if (error.message.includes("User validation failed")) ErrorOb = { Error: ERROR_MESSAGES.BAD_REQUEST, Status: 400 };
  if (error.message === "jwt malformed") ErrorOb = { Error: ERROR_MESSAGES.NO_ACCESS, Status: 401 };
  if (error.message === "invalid signature") ErrorOb = { Error: ERROR_MESSAGES.FORBIDDEN, Status: 403 };

  if (ErrorOb) res.status(ErrorOb.Status).send(ErrorOb);
  else res.status(error.status || 500).send(error);
};
