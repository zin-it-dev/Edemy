import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Search from "@/components/ui/Search";

describe("Search Component", () => {
    it("should render form search", () => {
        render(<Search />);

        const element = screen.getByRole("search");
        expect(element).toBeInTheDocument();
    });
});
