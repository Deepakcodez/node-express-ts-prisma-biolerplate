import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { ApiResponseUtil } from "../utils/apiResponse";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    ApiResponseUtil.error(res, error.message, undefined, error.statusCode);
    return;
  }

  // Handle Prisma errors
  if (error.name === "PrismaClientKnownRequestError") {
    const prismaError = error as any;
    if (prismaError.code === "P2002") {
      ApiResponseUtil.conflict(res, "Resource already exists");
      return;
    }
  }

  // Handle validation errors
  if (error.name === "ValidationError") {
    ApiResponseUtil.validationError(res, error.message);
    return;
  }

  // Log unexpected errors
  console.error("Unexpected error:", error);

  ApiResponseUtil.error(
    res,
    "Internal server error",
    process.env.NODE_ENV === "development" ? error.message : undefined
  );
};
