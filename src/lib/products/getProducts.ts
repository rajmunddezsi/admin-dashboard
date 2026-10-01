import type { Product } from "./types";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(query: string): Promise<Product[]> {
  let url = `${BASE_URL}?limit=5&delay=2000`;

  if (query) {
    const normalizedQuery = encodeURIComponent(query);

    url = `${BASE_URL}/search?q=${normalizedQuery}&limit=5&delay=2000`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products!");
  }

  const { products } = (await response.json()) as ProductsResponse;

  return products;
}