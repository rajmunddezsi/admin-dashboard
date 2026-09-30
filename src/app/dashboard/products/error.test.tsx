import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ProductsError from "./error";

describe("ProductsError", () => {
  it("shows error message and retry button", () => {
    render(<ProductsError error={new Error("Test error")} retry={() => {}} />);

    expect(screen.getByText("Unable to load products.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
  });

  it("calls retry when the user clicks Try again", async () => {
    const user = userEvent.setup();
    const retry = vi.fn();

    render(<ProductsError error={new Error("Test error")} retry={retry} />);

    const retryButton = screen.getByRole("button", { name: "Try again" });
    await user.click(retryButton);

    expect(retry).toHaveBeenCalledOnce();
  });
});
