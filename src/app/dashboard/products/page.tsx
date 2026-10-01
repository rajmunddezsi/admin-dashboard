import PageTitle from "@/components/ui/PageTitle";
import ViewSelector from "./_components/ViewSelector";
import { Suspense } from "react";
import ProductTableSkeleton from "./_components/table/ProductTableSkeleton";
import ProductTableSection from "./_components/table/ProductTableSection";
import ProductSearch from "./_components/search/ProductSearch";
import ProductCategoryFilter from "./_components/search/ProductCategoryFilter";
import type { ProductFilters } from "@/lib/products/types";

interface ProductsPageProps {
  searchParams: Promise<ProductFilters>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { query = "", category = "" } = await searchParams;

  return (
    <>
      <PageTitle title="Products" />
      <ViewSelector />
      <ProductSearch />
      <ProductCategoryFilter />
      <Suspense key={`${query}-${category}`} fallback={<ProductTableSkeleton />}>
        <ProductTableSection filters={{ query, category }} />
      </Suspense>
    </>
  );
}
