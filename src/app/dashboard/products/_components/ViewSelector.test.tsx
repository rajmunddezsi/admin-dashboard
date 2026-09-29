import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ViewSelector from "./ViewSelector";

describe("ViewSelector", () => {
  it("shows Table view default", () => {
    render(<ViewSelector />);
    expect(screen.getByText("Current view: Table")).toBeInTheDocument();
  });

  it("changes the current view to Cards", async () => {
    const user = userEvent.setup();

    render(<ViewSelector />);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "Cards");

    expect(screen.getByText("Current view: Cards")).toBeInTheDocument();
  });
});
