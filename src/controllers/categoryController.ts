import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { ApiResponseUtil } from "../utils/apiResponse";
import { SizeCreateRequest, LoginRequest, categoryCreateRequest } from "../types";
import { AuthenticatedRequest } from "../middleware/auth";
import { SizeService } from "@/services/sizeService";

export class categoryController {

  static async create(
    req: Request<{}, {}, categoryCreateRequest>,
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

  static async login(
    req: Request<{}, {}, LoginRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await AuthService.login(req.body);
      ApiResponseUtil.success(res, "Login successful", result);
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await AuthService.getUserById(req.user!.userId);
      ApiResponseUtil.success(res, "Profile retrieved successfully", user);
    } catch (error) {
      next(error);
    }
  }
}
