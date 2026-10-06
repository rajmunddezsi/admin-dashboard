import getProduct from "@/lib/products/getProduct";
import { notFound } from "next/navigation";
import ProductDetails from "../_components/details/ProductDetails";
import DeleteProductButton from "../_components/form/DeleteProductButton";
import ProductFavoriteButton from "../_components/ProductFavoriteButton";

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
      <ProductFavoriteButton initialIsFavorite={true} />
      <DeleteProductButton id={product.id} />
      <ProductDetails product={product} />
    </div>
  );
}
