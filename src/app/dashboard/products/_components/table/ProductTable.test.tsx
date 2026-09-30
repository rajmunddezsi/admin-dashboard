import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ProductTable from "./ProductTable";
import type { Product } from "@/lib/products/types";

describe("ProductTable", () => {
  it("shows a message if there are no products", () => {
    render(<ProductTable products={[]} />);

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  it("shows the product title, category and price", () => {
    const products: Product[] = [
      {
        id: 1,
        title: "Test product",
        description: "Test description",
        category: "test",
        price: 10,
        rating: 5,
        availabilityStatus: "In Stock",
      },
    ];

    render(<ProductTable products={products} />);

    expect(screen.getByText("Test product")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("links the product title to the product details page", () => {
    const products: Product[] = [
      {
        id: 1,
        title: "Test product",
        description: "Test description",
        category: "test",
        price: 10,
        rating: 5,
        availabilityStatus: "In Stock",
      },
    ];

    render(<ProductTable products={products} />);
    const link = screen.getByRole("link", { name: "Test product" });

    expect(link).toHaveAttribute("href", "/dashboard/products/1");
  });
});
