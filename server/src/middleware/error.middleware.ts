import { NextFunction, Request, Response } from "express";

export class CustomErr extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ErrorHandler = (
  err: CustomErr,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);

  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "something went wrong!";

  return res.status(statusCode).json({ error: { statusCode, errorMessage } });
};
