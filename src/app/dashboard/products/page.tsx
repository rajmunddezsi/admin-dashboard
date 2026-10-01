import PageTitle from "@/components/ui/PageTitle";
import ViewSelector from "./_components/ViewSelector";
import { Suspense } from "react";
import ProductTableSkeleton from "./_components/table/ProductTableSkeleton";
import ProductTableSection from "./_components/table/ProductTableSection";
import ProductSearch from "./_components/search/ProductSearch";

interface ProductsPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { query = "" } = await searchParams;

  return (
    <>
      <PageTitle title="Products" />
      <ViewSelector />
      <ProductSearch />
      <Suspense key={query} fallback={<ProductTableSkeleton />}>
        <ProductTableSection query={query} />
      </Suspense>
    </>
  );
}
