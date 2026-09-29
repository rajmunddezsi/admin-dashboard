import PageTitle from "@/components/ui/PageTitle";
import ProductTable from "./_components/ProductTable";
import ViewSelector from "./_components/ViewSelector";
import { getProducts } from "@/lib/products/getProducts";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageTitle title="Products" />
      <ViewSelector />
      <ProductTable products={products} />
    </>
  );
}
