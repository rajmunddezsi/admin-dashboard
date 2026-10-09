import prisma from "../prisma";
import type { Product } from "./types";

type CreateProductData = Omit<Product, "id" | "rating" | "availabilityStatus">;
type UpdateProductData = CreateProductData & {
  id: Product["id"];
};

export async function createProductRecord(data: CreateProductData) {
  return prisma.product.create({
    data,
  });
}

export async function updateProductRecord(data: UpdateProductData) {
  const { id, title, description, category, price } = data;

  return prisma.product.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      category,
      price,
    },
  });
}

export async function deleteProductRecord(id: Product["id"]) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}
