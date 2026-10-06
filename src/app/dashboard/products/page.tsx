import PageTitle from "@/components/ui/PageTitle";
import ViewSelector from "./_components/ViewSelector";
import { Suspense } from "react";
import ProductTableSkeleton from "./_components/table/ProductTableSkeleton";
import ProductTableSection from "./_components/table/ProductTableSection";
import ProductSearch from "./_components/search/ProductSearch";
import ProductCategoryFilter from "./_components/search/ProductCategoryFilter";
import type { Product, ProductFilters } from "@/lib/products/types";
import { redirect } from "next/navigation";
import { parsePage } from "@/lib/products/pagination";
import ProductSort from "./_components/search/ProductSort";
import Link from "next/link";
import OptimisticProductList from "./_components/OptimisticProductList";

interface ProductsPageProps {
  searchParams: Promise<ProductFilters>;
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 17 Pro",
    category: "smartphones",
    price: 1299,
    description: "Apple smartphone",
    rating: 4.8,
    availabilityStatus: "In Stock",
  },
  {
    id: 2,
    title: "MacBook Air",
    category: "laptops",
    price: 1499,
    description: "Apple laptop",
    rating: 4.7,
    availabilityStatus: "In Stock",
  },
  {
    id: 3,
    title: "Pixel 10",
    category: "smartphones",
    price: 999,
    description: "Google smartphone",
    rating: 4.6,
    availabilityStatus: "Low Stock",
  },
];

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
      <OptimisticProductList initialProducts={mockProducts} />
    </>
  );
}
