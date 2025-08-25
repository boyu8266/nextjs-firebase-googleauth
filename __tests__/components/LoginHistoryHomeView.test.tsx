import { LoginHistoryHomeView } from "@/app/components/LoginHistoryHomeView";
import { ClientLoginHistory } from "@/lib/firestore/models/login-history.model";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import { render, screen, waitFor } from "@testing-library/react";

describe("LoginHistoryHomeView", () => {
  const mockHistory: ClientLoginHistory[] = [
    {
      id: "1",
      provider: "google",
      timestamp: new Date("2023-01-01T10:00:00Z"),
    },
    {
      id: "2",
      provider: "github",
      timestamp: new Date("2023-01-02T11:00:00Z"),
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockHistory),
      }),
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading message initially", () => {
    render(
      <MantineProvider>
        <LoginHistoryHomeView />
      </MantineProvider>,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the Recent Logins heading after loading", async () => {
    render(
      <MantineProvider>
        <LoginHistoryHomeView />
      </MantineProvider>,
    );
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /recent logins/i }),
      ).toBeInTheDocument(),
    );
  });

  it("fetches and displays login history", async () => {
    render(
      <MantineProvider>
        <LoginHistoryHomeView />
      </MantineProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(mockHistory[0].timestamp.toLocaleString()),
      ).toBeInTheDocument();
      expect(screen.getByText(mockHistory[0].provider)).toBeInTheDocument();
      expect(
        screen.getByText(mockHistory[1].timestamp.toLocaleString()),
      ).toBeInTheDocument();
      expect(screen.getByText(mockHistory[1].provider)).toBeInTheDocument();
    });
  });

  it("displays 'No login history found.' if no history is returned", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      }),
    ) as jest.Mock;

    render(
      <MantineProvider>
        <LoginHistoryHomeView />
      </MantineProvider>,
    );
    await waitFor(() =>
      expect(screen.getByText("No login history found.")).toBeInTheDocument(),
    );
  });

  it("displays error message if fetch fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      }),
    ) as jest.Mock;

    render(
      <MantineProvider>
        <LoginHistoryHomeView />
      </MantineProvider>,
    );
    await waitFor(() =>
      expect(
        screen.getByText(/Error: Failed to fetch data/i),
      ).toBeInTheDocument(),
    );
  });
});
