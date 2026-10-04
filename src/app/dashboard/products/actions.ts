'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData): Promise<void> {
    const title = String(formData.get('title') ?? '');
    const description = String(formData.get('description') ?? '');
    const category = String(formData.get('category') ?? '');
    const price = Number(formData.get('price') ?? '');

    const response = await fetch('https://dummyjson.com/products/add', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            category,
            price
        })
    })

    if (!response.ok) {
        throw new Error('Failed to create product!');
    }

    const createdProduct = await response.json();

    console.log(createdProduct);

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}