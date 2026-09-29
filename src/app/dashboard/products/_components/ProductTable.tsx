import { type Product } from "@/lib/products/types";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <div>{product.title}</div>
          <div>{product.category}</div>
          <div>{product.price}</div>
        </div>
      ))}
    </div>
  );
}
