import PageTitle from "@/components/ui/PageTitle";
import ViewSelector from "./_components/ViewSelector";
import { Suspense } from "react";
import ProductTableSkeleton from "./_components/table/ProductTableSkeleton";
import ProductTableSection from "./_components/table/ProductTableSection";

export default function ProductsPage() {
  return (
    <>
      <PageTitle title="Products" />
      <ViewSelector />
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductTableSection />
      </Suspense>
    </>
  );
}
