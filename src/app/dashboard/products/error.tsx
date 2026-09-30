"use client";

interface ProductsErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ProductsError({ retry }: ProductsErrorProps) {
  return (
    <div>
      <h1>Unable to load products.</h1>
      <button onClick={retry}>Try again</button>
    </div>
  );
}
