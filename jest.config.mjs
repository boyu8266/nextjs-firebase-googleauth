import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/__tests__"],
  transformIgnorePatterns: ["/node_modules/(?!(@mantine|next-auth)/)"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/test-utils.tsx"],
};

export default createJestConfig(customJestConfig);
