import jwt, { SignOptions } from "jsonwebtoken";
import { AuthTokenPayload } from "../types";

export class JwtUtil {
  private static getSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is required");
    }
    return secret;
  }

  private static getExpiresIn() {
    return process.env.JWT_EXPIRES_IN || "7d";
  }

  static generateToken(payload: AuthTokenPayload): string {
    const options: SignOptions = { expiresIn: this.getExpiresIn() as string | any };
    return jwt.sign(payload, this.getSecret(), options);
  }

  static verifyToken(token: string): AuthTokenPayload {
    return jwt.verify(token, this.getSecret()) as AuthTokenPayload;
  }

  static decodeToken(token: string): AuthTokenPayload | null {
    try {
      return jwt.decode(token) as AuthTokenPayload;
    } catch {
      return null;
    }
  }
}
