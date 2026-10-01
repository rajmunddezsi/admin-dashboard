import type { Product, ProductFilters } from "./types";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(filters: ProductFilters): Promise<Product[]> {
    const {query, category} = filters;

        if (!query && !category) {
        return fetchAllProducts();
    }

    if (query && !category) {
        return searchProducts(query);
    }

    if (!query && category) {
        return fetchProductsByCategory(category);
    }

    if (query && category) {

    const products = await searchProducts(query, 0);

    return products.filter(product => product.category === category).slice(0, 5)
    }

    throw new Error("Unexpected product filter state.");
}

async function fetchProducts(url: string): Promise<Product[]> {
    const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products!");
  }

  const { products } = (await response.json()) as ProductsResponse;

  return products;
}

function fetchAllProducts(): Promise<Product[]> {
    return fetchProducts(`${BASE_URL}?limit=5&delay=2000`);
}

function searchProducts(query: string, limit = 5): Promise<Product[]> {
    return fetchProducts(`${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&delay=2000`);
}

function fetchProductsByCategory(category: string): Promise<Product[]> {
     return fetchProducts(`${BASE_URL}/category/${encodeURIComponent(category)}?limit=5&delay=2000`);
}