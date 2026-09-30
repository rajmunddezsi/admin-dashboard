import type { Product } from "./types";

export default async function getProduct(id: string): Promise<Product | undefined> {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (response.status === 404) {
        return undefined;
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch product. ID: ${id}`);
    }

    const product = (await response.json()) as Product;

    return product;
}