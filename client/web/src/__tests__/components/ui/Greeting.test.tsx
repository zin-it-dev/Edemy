import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Greeting from "@/components/ui/Greeting";

describe("Greeting Component", () => {
  it("renders the text greeting user with username", () => {
    render(<Greeting name="ZIN" />);
    expect(screen.getByText("Welcome to Edemy, ZIN!")).toBeInTheDocument();
  });
});
