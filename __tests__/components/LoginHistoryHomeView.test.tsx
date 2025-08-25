import { render, screen } from "@testing-library/react";
import { LoginHistoryHomeView } from "@/app/components/LoginHistoryHomeView";
import { getAllLoginHistory } from "@/lib/firestore/services/login-history.service";
import { ClientLoginHistory } from "@/lib/firestore/models/login-history.model";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider

// Mock the service function
jest.mock("@/lib/firestore/services/login-history.service", () => ({
  getAllLoginHistory: jest.fn(),
}));

describe("LoginHistoryHomeView", () => {
  const mockHistory: ClientLoginHistory[] = [
    {
      id: "1",
      userId: "user1",
      provider: "google",
      timestamp: new Date("2023-01-01T10:00:00Z"),
    },
    {
      id: "2",
      userId: "user2",
      provider: "github",
      timestamp: new Date("2023-01-02T11:00:00Z"),
    },
  ];

  beforeEach(() => {
    (getAllLoginHistory as jest.Mock).mockResolvedValue(mockHistory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Recent Logins heading", async () => {
    render(<MantineProvider>{await LoginHistoryHomeView()}</MantineProvider>); // Wrapped with MantineProvider
    expect(
      screen.getByRole("heading", { name: /recent logins/i }),
    ).toBeInTheDocument();
  });

  it("fetches and displays login history", async () => {
    render(<MantineProvider>{await LoginHistoryHomeView()}</MantineProvider>); // Wrapped with MantineProvider

    // Check if getAllLoginHistory was called with the correct limit
    expect(getAllLoginHistory).toHaveBeenCalledWith(10);

    // Check if the table content is rendered
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("google")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
    expect(screen.getByText("github")).toBeInTheDocument();
  });

  it("displays 'No login history found.' if no history is returned", async () => {
    (getAllLoginHistory as jest.Mock).mockResolvedValue([]);
    render(<MantineProvider>{await LoginHistoryHomeView()}</MantineProvider>); // Wrapped with MantineProvider
    expect(screen.getByText("No login history found.")).toBeInTheDocument();
  });
});
