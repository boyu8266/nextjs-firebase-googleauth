import { LoginHistoryTable } from "@/app/components/LoginHistoryTable";
import { ClientLoginHistory } from "@/lib/firestore/models/login-history.model";
import { render, screen } from "test-utils";

describe("LoginHistoryTable", () => {
  it("renders table rows with provided data", () => {
    const mockHistory: ClientLoginHistory[] = [
      {
        id: "1",
        timestamp: new Date("2023-01-01T10:00:00Z"),
        provider: "google",
      },
      {
        id: "2",
        timestamp: new Date("2023-01-02T11:00:00Z"),
        provider: "facebook",
      },
    ];

    render(<LoginHistoryTable history={mockHistory} />);

    expect(screen.getByText("Timestamp")).toBeInTheDocument();
    expect(screen.getByText("Provider")).toBeInTheDocument();

    expect(
      screen.getByText(mockHistory[0].timestamp.toLocaleString()),
    ).toBeInTheDocument();
    expect(screen.getByText("google")).toBeInTheDocument();

    expect(
      screen.getByText(mockHistory[1].timestamp.toLocaleString()),
    ).toBeInTheDocument();
    expect(screen.getByText("facebook")).toBeInTheDocument();
  });

  it("displays empty state message when history is empty", () => {
    render(<LoginHistoryTable history={[]} />);
    expect(screen.getByText("No login history found.")).toBeInTheDocument();
  });
});
