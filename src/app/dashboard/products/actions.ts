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

const UpdateProductSchema = ProductFormSchema.extend({
    id: z.int().positive()
})

export async function updateProduct(productId: number, _prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
    const validatedFields = UpdateProductSchema.safeParse({
        id: productId,
        title: formData.get('title'),
        description: formData.get("description"),
        category: formData.get("category"),
        price: formData.get('price')
    })

    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
            message: "Fix the errors!"
        }
    }

    const {id, title, description, category, price} = validatedFields.data;

    const response = await fetch(`https://dummyjson.com/products/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
            category,
            price
        })
    })

    if (!response.ok) {
        throw new Error('Failed to update product!')
    }

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products')
}

const DeleteProductSchema = z.object({
    id: z.int().positive()
})

export async function deleteProduct(productId: number): Promise<void> {
    const validatedFields = DeleteProductSchema.safeParse({
        id: productId
    })

    if (!validatedFields.success) {
        throw new Error('Invalid product ID!');
    }

    const {id} = validatedFields.data;

    const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Failed to delete product!');
    }

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}

export async function toggleFavorite(isFavorite: boolean): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(isFavorite), 1000)
    })
}