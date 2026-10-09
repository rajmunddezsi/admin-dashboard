import { Prisma } from "@/generated/prisma/browser";
import { PRODUCTS_PAGE_SIZE } from "./constants";
import { calculateSkip } from "./pagination";
import type { Product, ProductFilters, PaginatedProducts } from "./types";
import prisma from "../prisma";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(
  filters: ProductFilters,
  currentPage: number,
): Promise<PaginatedProducts> {
  const { query, category, sort } = filters;
  const skip = calculateSkip(currentPage, PRODUCTS_PAGE_SIZE);

  const where: Prisma.ProductWhereInput = {
    ...(query && {
      title: {
        contains: query,
        mode: "insensitive",
      },
    }),
    ...(category && {
      category,
    }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput | undefined =
    sort === "price-asc"
      ? { price: "asc" }
      : sort === "price-desc"
        ? { price: "desc" }
        : undefined;

  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take: PRODUCTS_PAGE_SIZE,
  });

  const total = await prisma.product.count({ where });

  return {
    products,
    total,
  };

  // let sorting = '';

  // if (sort) {
  //   const [sortBy, order] = sort.split('-');
  //   sorting = `sortBy=${sortBy}&order=${order}`;
  // }

  // if (!query && !category) {
  //   const result = await fetchAllProducts(skip, sorting);

  //   return {
  //     products: result.products,
  //     total: result.total,
  //   };
  // }

  // if (query && !category) {
  //   const result = await searchProducts(query, skip, sorting);

  //   return {
  //     products: result.products,
  //     total: result.total,
  //   };
  // }

  // if (!query && category) {
  //   const result = await fetchProductsByCategory(category, skip, sorting);

  //   return {
  //     products: result.products,
  //     total: result.total,
  //   };
  // }

  // if (query && category) {
  //   const result = await searchProducts(query, 0, sorting, 0);
  //   const filteredProducts = result.products.filter(
  //     (product) => product.category === category,
  //   );

  //   return {
  //     products: filteredProducts.slice(skip, skip + PRODUCTS_PAGE_SIZE),
  //     total: filteredProducts.length,
  //   };
  // }

  throw new Error("Unexpected product filter state.");
}

async function fetchProducts(url: string): Promise<ProductsResponse> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products!");
  }

  return (await response.json()) as ProductsResponse;
}

function fetchAllProducts(
  skip: number,
  sorting: string,
): Promise<ProductsResponse> {
  return fetchProducts(
    `${BASE_URL}?limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}${sorting ? `&${sorting}` : ""}`,
  );
}

function searchProducts(
  query: string,
  skip: number,
  sorting: string,
  limit = PRODUCTS_PAGE_SIZE,
): Promise<ProductsResponse> {
  return fetchProducts(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}${sorting ? `&${sorting}` : ""}`,
  );
}

function fetchProductsByCategory(
  category: string,
  skip: number,
  sorting: string,
): Promise<ProductsResponse> {
  return fetchProducts(
    `${BASE_URL}/category/${encodeURIComponent(category)}?limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}${sorting ? `&${sorting}` : ""}`,
  );
}
