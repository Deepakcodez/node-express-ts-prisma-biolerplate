import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { ApiResponseUtil } from "../utils/apiResponse";
import { SizeCreateRequest, LoginRequest } from "../types";
import { AuthenticatedRequest } from "../middleware/auth";
import { SizeService } from "@/services/sizeService";

export class sizeController {
  static async create(
    req: Request<{}, {}, SizeCreateRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await SizeService.create(req.body);
      ApiResponseUtil.success(res, "size created successfully", result, 201);
    } catch (error) {
      next(error);
    }
  }

  static async getSizes(
    req: Request<{}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await SizeService.getAll();
      ApiResponseUtil.success(res, "Login successful", result);
    } catch (error) {
      next(error);
    }
  }

  static async getSizesByCategoryId(
    req: Request<{}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categoryId = req.query.categoryId as string;
      const result = await SizeService.getAllByCategoryId(categoryId);
      ApiResponseUtil.success(res, "Login successful", result);
    } catch (error) {
      next(error);
    }
  }
}
