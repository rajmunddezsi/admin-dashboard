"use client";

import type { Product } from "@/lib/products/types";
import { useOptimistic, useState, useTransition } from "react";
import { deleteProductOptimistically } from "../actions";

interface OptimisticProductListProps {
  initialProducts: Product[];
}

const productReducer = (currentProducts: Product[], productId: number) =>
  currentProducts.filter((product) => product.id !== productId);

export default function OptimisticProductList({
  initialProducts,
}: OptimisticProductListProps) {
  const [error, setError] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [isPending, startTransition] = useTransition();
  const [optimisticProductList, removeOptimisticProduct] = useOptimistic(
    products,
    productReducer,
  );

  const handleDelete = (productId: number) => {
    setError("");

    startTransition(async () => {
      removeOptimisticProduct(productId);

      try {
        await deleteProductOptimistically(productId);

        setProducts((prevState) =>
          prevState.filter((product) => product.id !== productId),
        );
      } catch {
        setError("Failed to delete product!");
      }
    });
  };

  return (
    <div>
      {optimisticProductList.map((product) => (
        <div key={product.id}>
          {product.title} -{" "}
          <button disabled={isPending} onClick={() => handleDelete(product.id)}>
            Delete
          </button>
        </div>
      ))}
      {error && <div>{error}</div>}
    </div>
  );
}
