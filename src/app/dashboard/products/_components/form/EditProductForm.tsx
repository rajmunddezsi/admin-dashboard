"use client";

import type { Product } from "@/lib/products/types";
import SubmitButton from "./SubmitButton";
import { useActionState } from "react";
import { updateProduct } from "../../actions";
import type { ProductFormState } from "../../actions";

interface EditProductFormProps {
  product: Product;
}

const INITIAL_STATE: ProductFormState = {
  errors: {},
  message: "",
};

export default function EditProductForm({ product }: EditProductFormProps) {
  const { id, title, description, category, price } = product;
  const updateProductWithId = updateProduct.bind(null, id);

  const [state, formAction] = useActionState(
    updateProductWithId,
    INITIAL_STATE,
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" defaultValue={title} />
        {state.errors?.title?.map((err) => (
          <div key={err}>{err}</div>
        ))}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          defaultValue={description}
        ></textarea>
        {state.errors?.description?.map((err) => (
          <div key={err}>{err}</div>
        ))}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          defaultValue={category}
        />
        {state.errors?.category?.map((err) => (
          <div key={err}>{err}</div>
        ))}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" defaultValue={price} />
        {state.errors?.price?.map((err) => (
          <div key={err}>{err}</div>
        ))}
      </div>

      {state.message && <div>{state.message}</div>}

      <SubmitButton />
    </form>
  );
}
