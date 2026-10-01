import { getProducts } from "@/lib/products/getProducts";
import ProductTable from "./ProductTable";
import type { ProductFilters } from "@/lib/products/types";

interface ProductTableSectionProps {
  filters: ProductFilters;
}

export default async function ProductTableSection({
  filters,
}: ProductTableSectionProps) {
  const products = await getProducts(filters);

  return <ProductTable products={products} />;
}
