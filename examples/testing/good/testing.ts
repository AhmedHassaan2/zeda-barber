// WHY: Test behavior not implementation, use descriptive names,
// test edge cases, and mock at boundaries not internals.

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserCard } from "@/components/user-card";

const mockOnRemove = vi.fn();

const defaultUser = {
  name: "Ahmed Hassan",
  email: "ahmed@example.com",
  role: "admin" as const,
  onRemove: mockOnRemove,
};

describe("UserCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user name, email, and role badge", () => {
    render(<UserCard {...defaultUser} />);

    expect(screen.getByText("Ahmed Hassan")).toBeInTheDocument();
    expect(screen.getByText("ahmed@example.com")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("shows first letter avatar", () => {
    render(<UserCard {...defaultUser} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("calls onRemove with email when confirm clicked twice", async () => {
    const user = userEvent.setup();
    render(<UserCard {...defaultUser} />);

    await user.click(screen.getByText("Remove"));
    expect(screen.getByText("Confirm?")).toBeInTheDocument();
    expect(mockOnRemove).not.toHaveBeenCalled();

    await user.click(screen.getByText("Confirm?"));
    expect(mockOnRemove).toHaveBeenCalledWith("ahmed@example.com");
  });

  it("does not call onRemove on single click", async () => {
    const user = userEvent.setup();
    render(<UserCard {...defaultUser} />);

    await user.click(screen.getByText("Remove"));
    expect(mockOnRemove).not.toHaveBeenCalled();
  });

  it("renders different role badge colors", () => {
    const { rerender } = render(<UserCard {...defaultUser} role="member" />);
    expect(screen.getByText("member")).toHaveClass("bg-blue-100");

    rerender(<UserCard {...defaultUser} role="viewer" />);
    expect(screen.getByText("viewer")).toHaveClass("bg-gray-100");
  });
});
