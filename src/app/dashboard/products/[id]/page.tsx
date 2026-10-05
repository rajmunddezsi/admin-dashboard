import getProduct from "@/lib/products/getProduct";
import { notFound } from "next/navigation";
import ProductDetails from "../_components/details/ProductDetails";
import DeleteProductForm from "../_components/form/DeleteProductForm";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <DeleteProductForm id={product.id} />
      <ProductDetails product={product} />
    </div>
  );
}
