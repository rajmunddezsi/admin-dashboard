import { getProducts } from "@/lib/products/getProducts";
import ProductTable from "./ProductTable";
import type { Product, ProductFilters } from "@/lib/products/types";
import { PRODUCTS_PAGE_SIZE } from "@/lib/products/constants";
import Pagination from "../pagination/Pagination";
import { redirect } from "next/navigation";
import { calculateTotalPages } from "@/lib/products/pagination";

interface ProductTableSectionProps {
  filters: ProductFilters;
  currentPage: number;
}

export default async function ProductTableSection({
  filters,
  currentPage,
}: ProductTableSectionProps) {
  const { products, total } = await getProducts(filters, currentPage);
  const totalPages = calculateTotalPages(total, PRODUCTS_PAGE_SIZE);

  if (totalPages > 0 && currentPage > totalPages) {
    const nextParams = new URLSearchParams();

    if (filters.query) {
      nextParams.set("query", filters.query);
    }

    if (filters.category) {
      nextParams.set("category", filters.category);
    }

    nextParams.set("page", totalPages.toString());

    const queryString = nextParams.toString();

    redirect(
      queryString
        ? `/dashboard/products?${queryString}`
        : `/dashboard/products`,
    );
  }

  return (
    <div>
      <ProductTable products={products} />
      {totalPages > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
