import { Response } from "express";
import { ApiResponse } from "../types";

export class ApiResponseUtil {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): Response<ApiResponse<T>> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(
    res: Response,
    message: string,
    error?: string,
    statusCode: number = 500
  ): Response<ApiResponse> {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  }

  static validationError(
    res: Response,
    message: string = "Validation failed",
    error?: string
  ): Response<ApiResponse> {
    return this.error(res, message, error, 400);
  }

  static unauthorized(
    res: Response,
    message: string = "Unauthorized"
  ): Response<ApiResponse> {
    return this.error(res, message, undefined, 401);
  }

  static forbidden(
    res: Response,
    message: string = "Forbidden"
  ): Response<ApiResponse> {
    return this.error(res, message, undefined, 403);
  }

  static notFound(
    res: Response,
    message: string = "Resource not found"
  ): Response<ApiResponse> {
    return this.error(res, message, undefined, 404);
  }

  static conflict(
    res: Response,
    message: string = "Resource already exists"
  ): Response<ApiResponse> {
    return this.error(res, message, undefined, 409);
  }
}
