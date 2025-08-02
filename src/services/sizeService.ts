import { getSizeResponse } from "./../types/index";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import {

  SizeCreateResponse,
  SizeCreateRequest,
} from "../types";
import {
  ConflictError,
  AuthenticationError,
  NotFoundError,
} from "../utils/errors";

const prisma = new PrismaClient();

export class SizeService {
  static async create(data: SizeCreateRequest): Promise<SizeCreateResponse> {
    const { name, categoryId } = data;

    // Check if size already exists
    const existingSize = await prisma.size.findFirst({
      where: { name },
    });

    if (existingSize) {
      throw new ConflictError("Size with this email already exists");
    }
    // Create user
    const size = await prisma.size.create({
      data: {
        name,
        categoryId,
      },
    });

    return {
      size: {
        id: size.id,
        name: size.name,
        categoryId: size.categoryId || "",
        createdAt: size.createdAt,
        updatedAt: size.updatedAt,
        Product: [],
      },
    };
  }

  static async getAll() {
    const sizes = await prisma.size.findMany({
      include: {
        category: true,
      },
    });
    return sizes;
  }
  
  static async getAllByCategoryId(categoryId : string) {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundError("category not found");
    }
  
    const sizes = await prisma.size.findMany({
      where: { categoryId },
      include: { category: { select: { name: true } } }
    });
    return sizes;
  }
}
