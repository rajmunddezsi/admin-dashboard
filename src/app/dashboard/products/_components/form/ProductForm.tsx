"use client";

import { useActionState } from "react";
import { createProduct } from "../../actions";
import type { ProductFormState } from "../../actions";
import SubmitButton from "./SubmitButton";

const INITIAL_STATE: ProductFormState = {
  errors: {},
  message: "",
};

export default function ProductForm() {
  const [state, formAction] = useActionState(createProduct, INITIAL_STATE);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />
        {state.errors?.title?.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description"></textarea>
        {state.errors?.description?.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input id="category" name="category" type="text" />
        {state.errors?.category?.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" />
        {state.errors?.price?.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>

      {state.message && <div>{state.message}</div>}

      <SubmitButton />
    </form>
  );
}
