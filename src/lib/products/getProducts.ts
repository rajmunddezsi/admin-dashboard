import { PRODUCTS_PAGE_SIZE } from "./constants";
import { calculateSkip } from "./pagination";
import type { Product, ProductFilters, PaginatedProducts } from "./types";

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
  const { query, category } = filters;
  const skip = calculateSkip(currentPage, PRODUCTS_PAGE_SIZE);

  if (!query && !category) {
    const result = await fetchAllProducts(skip);

    return {
      products: result.products,
      total: result.total,
    };
  }

  if (query && !category) {
    const result = await searchProducts(query, skip);

    return {
      products: result.products,
      total: result.total,
    };
  }

  if (!query && category) {
    const result = await fetchProductsByCategory(category, skip);

    return {
      products: result.products,
      total: result.total,
    };
  }

  if (query && category) {
    const result = await searchProducts(query, 0, 0);
    const filteredProducts = result.products.filter(
      (product) => product.category === category,
    );

    return {
      products: filteredProducts.slice(skip, skip + PRODUCTS_PAGE_SIZE),
      total: filteredProducts.length,
    };
  }

  throw new Error("Unexpected product filter state.");
}

async function fetchProducts(url: string): Promise<ProductsResponse> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products!");
  }

  return (await response.json()) as ProductsResponse;
}

function fetchAllProducts(skip: number): Promise<ProductsResponse> {
  return fetchProducts(
    `${BASE_URL}?limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}`,
  );
}

function searchProducts(
  query: string,
  skip: number,
  limit = PRODUCTS_PAGE_SIZE,
): Promise<ProductsResponse> {
  return fetchProducts(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
  );
}

function fetchProductsByCategory(
  category: string,
  skip: number,
): Promise<ProductsResponse> {
  return fetchProducts(
    `${BASE_URL}/category/${encodeURIComponent(category)}?limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}`,
  );
}
