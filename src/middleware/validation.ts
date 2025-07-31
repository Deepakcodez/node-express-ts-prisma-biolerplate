import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ApiResponseUtil } from "../utils/apiResponse";

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      ApiResponseUtil.validationError(res, "Validation failed", errorMessage);
      return;
    }

    next();
  };
};
