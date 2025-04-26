import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import CreateTask from "../views/CreateTask";

describe("CreateTask component", () => {
    const mockRefetchTasks = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the form with Create Task button", () => {
        render(<CreateTask refetchTasks={mockRefetchTasks} />);
        expect(screen.getByRole("button", { name: /create task/i })).toBeInTheDocument();
    });

    it("calls API on form submission", async () => {
        const fakeFetch = vi.spyOn(globalThis, "fetch").mockImplementation(url => {
            if (url.includes(`http://localhost:8080/api/statuses`)) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        statuses: [
                            { value: "todo", label: "Todo" },
                            { value: "in-progress", label: "In Progress" },
                            { value: "done", label: "Done" },
                        ],
                    }),
                });
            }

            if (url.includes(`http://localhost:8080/api/create-task`)) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({}),
                });
            }

            return Promise.reject(new Error("Unknown URL"));
        });

        render(<CreateTask refetchTasks={mockRefetchTasks} />);

        await screen.findByLabelText(/title/i);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Title" } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description" } });
        fireEvent.change(screen.getByLabelText(/due/i), { target: { value: "2025-05-01" } });

        fireEvent.submit(screen.getByRole("form"));

        await waitFor(() => {
            expect(fakeFetch).toHaveBeenCalledWith(
                expect.stringContaining("/api/create-task"),
                expect.objectContaining({ method: "POST" })
            );
        });
    });

    it("shows errors if API returns error", async () => {
        vi.spyOn(globalThis, "fetch").mockImplementation(url => {
            if (url.includes(`http://localhost:8080/api/statuses`)) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        statuses: [
                            { value: "todo", label: "Todo" },
                            { value: "in-progress", label: "In Progress" },
                            { value: "done", label: "Done" },
                        ],
                    }),
                });
            }

            if (url.includes(`http://localhost:8080/api/create-task`)) {
                return Promise.resolve({
                    ok: false,
                    json: async () => ({
                        errors: [{ field: "title", message: "Title is required" }],
                    }),
                });
            }

            return Promise.reject(new Error("Unknown URL"));
        });

        render(<CreateTask refetchTasks={mockRefetchTasks} />);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "" } });
        fireEvent.submit(screen.getByRole("form"));

        await waitFor(() => {
            expect(screen.getByText(/title : title is required/i)).toBeInTheDocument();
        });
    });

    it("calls refetchTasks on successful creation", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async () => ({}),
        });

        render(<CreateTask refetchTasks={mockRefetchTasks} />);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Another Task" } });
        fireEvent.submit(screen.getByRole("form"));

        await waitFor(() => {
            expect(mockRefetchTasks).toHaveBeenCalledTimes(1);
        });
    });
});
