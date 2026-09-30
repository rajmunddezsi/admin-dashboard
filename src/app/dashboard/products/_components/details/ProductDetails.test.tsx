import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";

import ProductDetails from "./ProductDetails";
import type { Product } from "@/lib/products/types";

describe("ProductDetails", () => {
  it("shows the product's title, description, price and category", () => {
    const product: Product = {
      id: 1,
      title: "Test title",
      description: "Test description",
      price: 10,
      category: "test",
      rating: 5.5,
      availabilityStatus: "In Stock",
    };

    render(<ProductDetails product={product} />);

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(product.price.toString())).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
  });
});
