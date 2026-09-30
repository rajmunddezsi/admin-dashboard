import getProduct from "@/lib/products/getProduct";
import { notFound } from "next/navigation";
import ProductDetails from "../_components/details/ProductDetails";

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

  return <ProductDetails product={product} />;
}
