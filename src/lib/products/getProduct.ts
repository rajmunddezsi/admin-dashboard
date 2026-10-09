import type { Product } from "./types";
import prisma from "../prisma";

export default async function getProduct(id: string): Promise<Product | null> {
  const normalizedId = Number(id);

  if (!Number.isInteger(normalizedId) || normalizedId < 1) {
    return null;
  }

  return prisma.product.findUnique({
    where: {
      id: normalizedId,
    },
  });
}
