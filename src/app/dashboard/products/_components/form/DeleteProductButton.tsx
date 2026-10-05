"use client";

import { useTransition } from "react";
import { deleteProduct } from "../../actions";

interface DeleteProductButtonProps {
  id: number;
}

export default function DeleteProductButton({ id }: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await deleteProduct(id);
    });
  };

  return (
    <button disabled={isPending} onClick={handleClick}>
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
