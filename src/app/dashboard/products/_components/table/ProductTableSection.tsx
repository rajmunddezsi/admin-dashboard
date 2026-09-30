import { getProducts } from "@/lib/products/getProducts";
import ProductTable from "./ProductTable";

export default async function ProductTableSection() {
  const products = await getProducts();

  return <ProductTable products={products} />;
}
