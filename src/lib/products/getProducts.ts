import type { Product } from "./types";

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export async function getProducts(): Promise<Product[]> {
    const response = await fetch("https://dummyjson.com/products?limit=5");

    if (!response.ok) {
        throw new Error("Failed to fetch products!");
    }

    const {products} = await response.json() as ProductsResponse;

    return products;
}