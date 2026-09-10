import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    clearMocks: true,
    setupFilesAfterEnv: ["<rootDir>/src/__tests__/jest.setup.ts"],
    testMatch: ["**/__tests__/**/*.+(spec|test).+(js|jsx|ts|tsx)"],
    collectCoverage: true,
    coverageDirectory: "coverage/",
    coverageReporters: ["html", "json"],
    collectCoverageFrom: [
        "**/components/**/.{js,jsx,ts,tsx}",
        "**/app/**/*.{js,jsx,ts,tsx}",
    ],
    // Map next-router-mock to the next/navigation module it mocks
    // Learn more - https://github.com/scottrippey/next-router-mock
    moduleNameMapper: {
        "^next/navigation$": "next-router-mock",
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/(.*)$": "<rootDir>/$1",
    },
    testPathIgnorePatterns: ['<rootDir>/e2e/', '<rootDir>/.next/', '<rootDir>/node_modules/'],
};

export default createJestConfig(config);
