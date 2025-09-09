import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Loading from "@/components/ui/Loading";

describe("Loading Component", () => {
  it("renders the loading with the correct text", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
