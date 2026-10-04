import PageTitle from "@/components/ui/PageTitle";
import ViewSelector from "./_components/ViewSelector";
import { Suspense } from "react";
import ProductTableSkeleton from "./_components/table/ProductTableSkeleton";
import ProductTableSection from "./_components/table/ProductTableSection";
import ProductSearch from "./_components/search/ProductSearch";
import ProductCategoryFilter from "./_components/search/ProductCategoryFilter";
import type { ProductFilters } from "@/lib/products/types";
import { redirect } from "next/navigation";
import { parsePage } from "@/lib/products/pagination";
import ProductSort from "./_components/search/ProductSort";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: Promise<ProductFilters>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { query = "", category = "", page, sort = "" } = await searchParams;
  const { currentPage, isValid } = parsePage(page);

  if (page !== undefined && !isValid) {
    const params = new URLSearchParams();

    if (query) {
      params.set("query", query);
    }

    if (category) {
      params.set("category", category);
    }

    if (sort) {
      params.set("sort", sort);
    }

    const queryString = params.toString();

    redirect(
      queryString
        ? `/dashboard/products?${queryString}`
        : "/dashboard/products",
    );
  }

  return (
    <>
      <PageTitle title="Products" />
      <Link href="/dashboard/products/new">Create product</Link>
      <ViewSelector />
      <ProductSearch />
      <ProductCategoryFilter />
      <ProductSort />
      <Suspense
        key={`${query}-${category}-${currentPage}-${sort}`}
        fallback={<ProductTableSkeleton />}
      >
        <ProductTableSection
          filters={{ query, category, sort }}
          currentPage={currentPage}
        />
      </Suspense>
    </>
  );
}
