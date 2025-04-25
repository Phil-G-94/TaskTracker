import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import Modal from "../components/Modal";

describe("Modal component", () => {
    beforeEach(() => {
        const modalRoot = document.createElement("div");
        modalRoot.setAttribute("id", "modal");
        document.body.appendChild(modalRoot);
    });

    afterEach(() => {
        const modalRoot = document.getElementById("modal");
        if (modalRoot) {
            document.body.removeChild(modalRoot);
        }
    });

    it("renders modal content in the portal", () => {
        render(
            <Modal closeEditModal={() => {}}>
                <p>Test Modal Content</p>
            </Modal>
        );

        expect(screen.getByText("Edit Task")).toBeInTheDocument();
        expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
    });

    it("calls closeEditModal after clicking backdrop and 300ms delay", async () => {
        vi.useFakeTimers();
        const closeEditModal = vi.fn();
        render(
            <Modal closeEditModal={closeEditModal}>
                <p>Child Content</p>
            </Modal>
        );

        const backdrop = screen.getByRole("presentation");
        fireEvent.click(backdrop);

        vi.advanceTimersByTime(300);

        expect(closeEditModal).toHaveBeenCalledTimes(1);
    });
});
