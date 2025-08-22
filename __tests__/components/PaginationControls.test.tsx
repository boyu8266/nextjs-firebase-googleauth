import { render, screen, fireEvent } from "test-utils";
import { PaginationControls } from "@/app/components/PaginationControls";

describe("PaginationControls", () => {
  it("renders Previous and Next buttons", () => {
    render(
      <PaginationControls
        currentPage={1}
        totalPages={5}
        onPageChange={jest.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Previous" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("disables Previous button on the first page", () => {
    render(
      <PaginationControls
        currentPage={1}
        totalPages={5}
        onPageChange={jest.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  });

  it("disables Next button on the last page", () => {
    render(
      <PaginationControls
        currentPage={5}
        totalPages={5}
        onPageChange={jest.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("enables both buttons on middle pages", () => {
    render(
      <PaginationControls
        currentPage={3}
        totalPages={5}
        onPageChange={jest.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
  });

  it("calls onPageChange with correct page number when Previous button is clicked", () => {
    const mockOnPageChange = jest.fn();
    render(
      <PaginationControls
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with correct page number when Next button is clicked", () => {
    const mockOnPageChange = jest.fn();
    render(
      <PaginationControls
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with correct page number when a page number is clicked", () => {
    const mockOnPageChange = jest.fn();
    render(
      <PaginationControls
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "2" })); // Click on page 2
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
