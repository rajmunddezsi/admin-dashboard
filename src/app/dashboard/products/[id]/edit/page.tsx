import PageTitle from "@/components/ui/PageTitle";
import EditProductForm from "../../_components/form/EditProductForm";
import getProduct from "@/lib/products/getProduct";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <PageTitle title="Edit product" />
      <EditProductForm product={product} />
    </div>
  );
}
