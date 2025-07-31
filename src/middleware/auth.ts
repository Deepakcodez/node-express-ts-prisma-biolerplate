import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/jwt";
import { ApiResponseUtil } from "../utils/apiResponse";
import { AuthenticationError } from "../utils/errors";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError("Access token is required");
    }

    const token = authHeader.substring(7);
    const decoded = JwtUtil.verifyToken(token);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      ApiResponseUtil.unauthorized(res, error.message);
      return;
    }
    ApiResponseUtil.unauthorized(res, "Invalid or expired token");
  }
};
