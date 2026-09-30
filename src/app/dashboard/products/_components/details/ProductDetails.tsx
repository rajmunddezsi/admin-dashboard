import type { Product } from "@/lib/products/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { title, description, price, category } = product;
  return (
    <div>
      <h1>{title}</h1>
      <div>{price}</div>
      <div>{category}</div>
      <p>{description}</p>
    </div>
  );
}
