import { getProducts } from "@/lib/products/getProducts";
import ProductTable from "./ProductTable";

interface ProductTableSectionProps {
  query: string;
}

export default async function ProductTableSection({
  query,
}: ProductTableSectionProps) {
  const products = await getProducts(query);

  return <ProductTable products={products} />;
}
