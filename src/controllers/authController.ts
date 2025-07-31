import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { ApiResponseUtil } from "../utils/apiResponse";
import { RegisterRequest, LoginRequest } from "../types";
import { AuthenticatedRequest } from "../middleware/auth";

export class AuthController {
  static async register(
    req: Request<{}, {}, RegisterRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await AuthService.register(req.body);
      ApiResponseUtil.success(res, "User registered successfully", result, 201);
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
