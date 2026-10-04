'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export interface ProductFormState {
    errors?: {
        title?: string[],
        description?: string[],
        category?: string[],
        price?: string[]
    };
    message?: string
}

const ProductFormSchema = z.object({
    title: z.string().trim().min(1, {error: "Title is required."}),
    description: z.string().trim().min(1, {error: "Description is required."}),
    category: z.string().trim().min(1, {error: "Category is required."}),
    price: z.coerce.number().positive({error: "Price must be greater than 0."})
});

export async function createProduct(_prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
    const validatedFields = ProductFormSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        price: formData.get('price')
    });

    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
            message: "Please fix the errors!"
        }
    }

    const {title, description, category, price} = validatedFields.data;

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
    
    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}