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
        title: "Essence Mascara Lash Princess",
        category: "beauty",
        price: 9.99,
      },
    ];

    render(<ProductTable products={products} />);

    expect(
      screen.getByText("Essence Mascara Lash Princess"),
    ).toBeInTheDocument();
    expect(screen.getByText("beauty")).toBeInTheDocument();
    expect(screen.getByText("9.99")).toBeInTheDocument();
  });
});
