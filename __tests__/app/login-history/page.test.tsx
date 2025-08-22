import { render, screen, waitFor } from "test-utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginHistoryPage from "@/app/login-history/page";

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock fetch API
global.fetch = jest.fn();

describe("LoginHistoryPage", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "loading",
    });
    mockPush.mockClear();
    (global.fetch as jest.Mock).mockClear();
  });

  it("redirects to login page if unauthenticated", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    render(<LoginHistoryPage />);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("displays loading state initially", () => {
    render(<LoginHistoryPage />);
    // Mantine Loader doesn't render text, so we check for its role or a specific test ID
    // For simplicity, we'll check for a generic loading indicator if no specific text is present.
    // If the Loader component renders a specific accessible name, we can use that.
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("fetches and displays login history for authenticated user", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        history: [
          {
            id: "1",
            userId: "test@example.com",
            timestamp: new Date(),
            provider: "google",
          },
        ],
        lastDocId: null,
        totalCount: 1,
      }),
    });

    render(<LoginHistoryPage />);

    await waitFor(() => {
      expect(screen.getByText("Login History")).toBeInTheDocument();
      expect(screen.getByText("google")).toBeInTheDocument();
    });
  });

  it("displays error message on fetch failure", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<LoginHistoryPage />);

    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.getByText("HTTP error! status: 500")).toBeInTheDocument();
    });
  });
});
