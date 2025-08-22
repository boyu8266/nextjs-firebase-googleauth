import "@testing-library/jest-dom";

// Mock next-auth/react's SessionProvider
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"), // Import and retain default behavior
  SessionProvider: ({ children }) => children, // Mock SessionProvider to just render its children
}));
