import PageTitle from "@/components/ui/PageTitle";
import ProductTable from "./_components/ProductTable";
import ViewSelector from "./_components/ViewSelector";

export default function ProductsPage() {
  return (
    <>
      <PageTitle title="Products" />
      <ViewSelector views={["Cards", "Table"]} />
      <ProductTable />
    </>
  );
}
