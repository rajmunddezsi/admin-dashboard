"use client";

import { startTransition, useOptimistic, useState } from "react";
import { toggleFavorite } from "../actions";

interface ProductFavoriteButtonProps {
  initialIsFavorite: boolean;
}

export default function ProductFavoriteButton({
  initialIsFavorite,
}: ProductFavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialIsFavorite);
  const [optimisticIsFavorite, setOptimisticIsFavorite] =
    useOptimistic<boolean>(isFavorite);

  const handleClick = () => {
    const nextValue = !optimisticIsFavorite;

    startTransition(async () => {
      setOptimisticIsFavorite(nextValue);
      const newValue = await toggleFavorite(nextValue);
      setIsFavorite(newValue);
    });
  };

  return (
    <button onClick={handleClick}>
      {optimisticIsFavorite ? "❤️" : "🤍"} Favorite
    </button>
  );
}
