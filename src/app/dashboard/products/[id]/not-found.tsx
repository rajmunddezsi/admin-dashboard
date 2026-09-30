import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div>
      <h1>Product not found!</h1>
      <Link href="/dashboard/products">Back to products</Link>
    </div>
  );
}
