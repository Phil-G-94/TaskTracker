import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ErrorMessages from "../components/Error";
import { describe, it, expect } from "vitest";

describe("ErrorMessages component", () => {
    it("renders without crashing when no errors provided", () => {
        render(<ErrorMessages errors={[]} />);

        const container = screen.getByRole("region");

        expect(container).toBeInTheDocument();
    });

    it("does not render any elements when empty", () => {
        render(<ErrorMessages errors={[]} />);

        const errorElements = screen.queryAllByText(/:/);

        expect(errorElements.length).toBe(0);
    });

    it("renders the correct number of error messages", () => {
        const errors = [
            { field: "title", message: "Title is required" },
            { field: "taskId", message: "Invalid task ID" },
        ];

        render(<ErrorMessages errors={errors} />);

        const errorElements = screen.queryAllByText(/:/);

        expect(errorElements.length).toBe(errors.length);
    });

    it("renders the correct content for each error", () => {
        const errors = [{ field: "title", message: "Title is required" }];

        render(<ErrorMessages errors={errors} />);

        expect(screen.getByText("title : Title is required")).toBeInTheDocument();
    });
});
